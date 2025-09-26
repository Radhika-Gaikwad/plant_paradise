import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import OrderService from "../../services/orderAdmin";
import debounce from "lodash/debounce";
import { Eye, XCircle, Trash2 } from "lucide-react";
import { showToast } from "../../utils/showToast";
const STATUS_OPTIONS = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERYPARTNERASSIGNED",
  "OUTFORDELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const PAGE_LIMITS = [5, 8, 10, 20, 50]; // added 8 as you earlier requested

const AdminOrders = () => {
  // ---- original states kept ----
  const [serverOrders, setServerOrders] = useState([]); // <-- holds whatever backend returns
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
 const navigate = useNavigate(); 
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven values (single source of truth)
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";
  const paymentModeFilter = searchParams.get("paymentMode") || "";

  // local controlled search input (debounced -> updates URL)
  const [searchInput, setSearchInput] = useState(search);

  // derived payment-mode options (from server response)
  const [paymentModesList, setPaymentModesList] = useState([]);

  // keep local searchInput in sync when URL changes externally
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // debounce function to update 'search' query param (so URL updates are not too frequent)
  const debouncedUpdateSearch = useMemo(
    () =>
      debounce((val) => {
        const params = new URLSearchParams(window.location.search);
        if (!val) params.delete("search");
        else params.set("search", val);
        params.set("page", "1");
        setSearchParams(params, { replace: false });
      }, 450),
    [setSearchParams]
  );

  useEffect(() => {
    return () => debouncedUpdateSearch.cancel();
  }, [debouncedUpdateSearch]);

  // helper to update any single query param and reset page to 1 (unless explicitly changing page)
  const updateQueryParam = (key, value, { resetPage = true } = {}) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "" || value == null) params.delete(key);
    else params.set(key, String(value));
    if (resetPage) params.set("page", "1");
    setSearchParams(params, { replace: false });
  };

  // page-only update (keeps other params)
  const updatePage = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(newPage));
    setSearchParams(params, { replace: false });
  };

  // Fetch orders whenever refreshKey changes or if you want server-side filtering you can rely on URL-driven params.
  // We'll still fetch with the filters, but on top of that we apply client-side filtering & paging to guarantee the behavior you asked.
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // call backend with the exact filters (server may or may not respect them)
        const payload = await OrderService.getAllOrders({
          page,
          limit,
          search,
          status: statusFilter,
          paymentMode: paymentModeFilter,
        });

        // tolerant to different shapes: { orders, total } or {data, total} etc.
        const fetchedOrders =
          payload?.orders ?? payload?.data ?? payload?.rows ?? [];

        if (!cancelled) {
          setServerOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
          // extract available payment modes from the returned page (useful for select options)
          const pm = Array.from(
            new Set(
              (Array.isArray(fetchedOrders) ? fetchedOrders : [])
                .map((o) => (o.paymentMode ? String(o.paymentMode) : null))
                .filter(Boolean)
            )
          );
          setPaymentModesList(pm);
          // we will set `total` from client-side filtered list below in useMemo effect
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load orders");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
    // We intentionally depend on refreshKey only for refetch; page/limit/search/status/paymentMode are passed to server call but we still do client filtering.
  }, [page, limit, search, statusFilter, paymentModeFilter, refreshKey]);

  // CLIENT-SIDE FILTERING + PAGING
  // This guarantees that:
  //  - typing search shows only matching rows
  //  - status and payment mode filters show matching rows
  //  - limit controls how many rows are shown
  const filteredOrders = useMemo(() => {
    const s = String(search || "").trim().toLowerCase();
    const statusF = String(statusFilter || "").trim().toLowerCase();
    const pmF = String(paymentModeFilter || "").trim().toLowerCase();

    const all = Array.isArray(serverOrders) ? serverOrders : [];

    const result = all.filter((o) => {
      // status filter
      if (statusF && String(o.status || "").toLowerCase() !== statusF) return false;
      // payment mode filter
      if (pmF && String(o.paymentMode || "").toLowerCase() !== pmF) return false;

      if (!s) return true; // no search term, include

      // search across orderId, username, email, and product names (case-insensitive, substring)
      const matchesOrderId = String(o.orderId || "").toLowerCase().includes(s);
      const matchesName = String(o.userName || "").toLowerCase().includes(s);
      const matchesEmail = String(o.userEmail || "").toLowerCase().includes(s);

      // search product names and SKU etc.
      let matchesProduct = false;
      if (Array.isArray(o.products)) {
        for (const p of o.products) {
          if (
            String(p.productName || "").toLowerCase().includes(s) ||
            String(p.sku || "").toLowerCase().includes(s)
          ) {
            matchesProduct = true;
            break;
          }
        }
      }

      return matchesOrderId || matchesName || matchesEmail || matchesProduct;
    });

    return result;
  }, [serverOrders, search, statusFilter, paymentModeFilter]);

  // Update total from filtered results; if page is out-of-range clamp it
  useEffect(() => {
    const computedTotal = filteredOrders.length;
    setTotal(computedTotal);

    const totalPages = Math.max(1, Math.ceil(computedTotal / Math.max(1, limit)));
    if (page > totalPages) {
      // clamp back to 1 so UI doesn't show invalid page
      updatePage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOrders, limit]); // note: page intentionally not included to avoid loops

  const totalPages = Math.max(1, Math.ceil((Number(total) || 0) / Math.max(1, limit)));

  // the actual slice to render on current page
  const pagedOrders = useMemo(() => {
    const p = Math.max(1, page);
    const start = (p - 1) * limit;
    return filteredOrders.slice(start, start + limit);
  }, [filteredOrders, page, limit]);

const openOrder = (order) => {
  console.log("Open order", order);
  navigate(`/admin/orders/orderDetails/${order.orderId}`, { state: { order } });
};

  const closeOrder = () => setSelectedOrder(null);



// ...

const handleStatusChange = async (order, newStatus) => {
  if (!newStatus || order.status === newStatus) return;
  try {
    setLoading(true);
    await OrderService.updateOrderStatus(order.orderId, { status: newStatus });
    setRefreshKey((k) => k + 1);
    showToast(`Order ${order.orderId} status updated to ${newStatus}`, "success");
  } catch (err) {
    showToast(err?.message || "Failed to update status", "error");
  } finally {
    setLoading(false);
  }
};

const handleAdminCancel = async (order) => {
  try {
    setLoading(true);
    await OrderService.adminCancelOrder(order.orderId);
    setRefreshKey((k) => k + 1);
    showToast(`Order ${order.orderId} cancelled successfully`, "success");
  } catch (err) {
    showToast(err?.message || "Failed to cancel order", "error");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (order) => {
  try {
    setLoading(true);
    await OrderService.deleteOrder(order.orderId);
    setRefreshKey((k) => k + 1);
    showToast(`Order ${order.orderId} deleted permanently`, "success");
  } catch (err) {
    showToast(err?.message || "Failed to delete order", "error");
  } finally {
    setLoading(false);
  }
};


  // UI helpers
  const fmtDateOnly = (d) => (d ? new Date(d).toLocaleDateString() : "-");

  // dynamic table container height based on `limit` (rows) and available viewport
  const computeTableMaxHeight = () => {
    // row height estimate (px) and header height
    const rowEstimate = 62; // approximate per-row height in px for desktop table (adjust if needed)
    const headerEstimate = 84;
    const footerBuffer = 60;
    if (typeof window === "undefined") {
      return `${Math.min(limit * rowEstimate + headerEstimate + footerBuffer, 800)}px`;
    }
    const maxFromRows = limit * rowEstimate + headerEstimate + footerBuffer;
    const capped = Math.min(maxFromRows, Math.round(window.innerHeight * 0.78));
    return `${capped}px`;
  };

  const tableMaxHeightStyle = { maxHeight: computeTableMaxHeight() };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      {/* Header */}
      <div className="bg-white shadow-md rounded-2xl p-2  mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Manage Orders</h1>
          <p className="text-gray-500 mt-2">View, filter and manage customer orders.</p>
        </div>

        <div className="mt-4 sm:mt-0 flex gap-3">
          <button
            onClick={() => {
              // clear filters but keep page=1 (empty everything)
              setSearchParams({}, { replace: false });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
        {/* Search (local input, debounced to URL) */}
        <input
          type="search"
          placeholder="Search orders (id, product, name, email)..."
          value={searchInput}
          onChange={(e) => {
            const v = e.target.value;
            setSearchInput(v);
            debouncedUpdateSearch(v);
          }}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 shadow-sm"
        />

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => updateQueryParam("status", e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Payment Mode filter (options from page + allow manual entries) */}
        <select
          value={paymentModeFilter}
          onChange={(e) => updateQueryParam("paymentMode", e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        >
          <option value="">All payment modes</option>
          {paymentModesList.length > 0
            ? paymentModesList.map((pm) => (
                <option key={pm} value={pm}>
                  {pm}
                </option>
              ))
            : // fallback common options if service didn't return any modes yet
              ["COD", "ONLINE", "WALLET", "UPI", "OTHER"].map((pm) => (
                <option key={pm} value={pm}>
                  {pm}
                </option>
              ))}
        </select>

        {/* Page size */}
        <select
          value={limit}
          onChange={(e) => updateQueryParam("limit", e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm"
        >
          {PAGE_LIMITS.map((l) => (
            <option key={l} value={l}>
              Show {l}
            </option>
          ))}
        </select>

        <div className="text-sm text-gray-600 ml-auto">Total: {total}</div>
      </div>

      {/* Table (desktop) */}
      <div className="bg-white shadow-lg rounded-2xl hidden md:block">
        <div className="overflow-auto border rounded-lg" style={tableMaxHeightStyle}>
          <table className="min-w-full w-[140%] table-fixed border-collapse">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800 sticky top-0 z-30">
              <tr>
                <th className="sticky left-0 bg-blue-300 z-20 w-12 text-center px-4 py-3 border text-sm font-semibold">SN</th>
                <th className="sticky left-12 bg-blue-300 z-20 min-w-[160px] px-4 py-3 border text-sm font-semibold">Customer</th>
                <th className="min-w-[350px] px-4 py-3 border text-sm font-semibold">Product Details</th>
                <th className="min-w-[150px] px-4 py-3 border text-sm font-semibold">Payment Mode</th>
                <th className="min-w-[120px] px-4 py-3 border text-sm font-semibold">Total</th>
                <th className="min-w-[120px] px-4 py-3 border text-sm font-semibold">Status</th>
                <th className="min-w-[140px] px-4 py-3 border text-sm font-semibold">Created On</th>
                <th className="min-w-[120px] px-4 py-3 border text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading && (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && pagedOrders.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500 italic">No orders found.</td>
                </tr>
              )}

              {pagedOrders.map((order, idx) => (
                <tr key={order.orderId ?? idx} className="hover:bg-gray-50">
                  <td className="sticky left-0 bg-white z-10 w-12 text-center border px-3 py-3">
                    {(page - 1) * limit + idx + 1}
                  </td>

                  <td className="sticky left-12 bg-white z-10 px-3 py-3 border whitespace-normal break-words">
                    <div className="font-medium">{order.userName || "-"}</div>
                    <div className="text-xs text-gray-500 break-words">{order.userEmail || "-"}</div>
                  </td>

                  <td className="px-3 py-3 border text-sm whitespace-normal break-words">
                    {Array.isArray(order.products) && order.products.length > 0 ? (
                      order.products.map((p, i) => (
                        <div key={i} className="text-xs">
                          {p.productName} ({p.quantity} × ₹{p.price})
                        </div>
                      ))
                    ) : (
                      <div className="text-xs">—</div>
                    )}
                  </td>

                  <td className="px-3 py-3 border whitespace-normal break-words">{order.paymentMode || "-"}</td>

                  <td className="px-3 py-3 border">₹{order.totalPrice ?? "-"}</td>

                  <td className="px-3 py-3 border">
                    <select
                      value={order.status || ""}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      className="px-2 py-1 rounded text-xs border w-full"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-3 py-3 border">{fmtDateOnly(order.createdOn)}</td>

                  <td className="px-3 py-3 border">
                    <div className="flex gap-2 flex-wrap">
                      <Eye className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => openOrder(order)} />
                      <XCircle className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleAdminCancel(order)} />
                      <Trash2 className="w-5 h-5 text-gray-600 cursor-pointer" onClick={() => handleDelete(order)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards (mobile) */}
      <div className="grid gap-4 md:hidden">
        {loading && (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        )}
        {!loading && pagedOrders.length === 0 && (
          <div className="p-4 text-center text-gray-500 italic">No orders found.</div>
        )}

        {pagedOrders.map((order, idx) => (
          <div key={order.orderId ?? idx} className="bg-white shadow-md rounded-xl p-4 border">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium">#{(page - 1) * limit + idx + 1} — {order.userName || "-"}</div>
                <div className="text-xs text-gray-500 break-words">{order.userEmail || "-"}</div>
              </div>
              <div className="text-xs text-gray-500">{fmtDateOnly(order.createdOn)}</div>
            </div>

            <div className="mt-2 text-sm">
              {Array.isArray(order.products) && order.products.length > 0 ? (
                order.products.map((p, i) => (
                  <div key={i} className="text-xs">
                    {p.productName} ({p.quantity} × ₹{p.price})
                  </div>
                ))
              ) : (
                <div className="text-xs">—</div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="text-sm">Payment: <span className="font-medium">{order.paymentMode || "-"}</span></div>
              <div className="text-sm">Total: <span className="font-medium">₹{order.totalPrice ?? "-"}</span></div>
            </div>

            <div className="mt-3">
              <select
                value={order.status || ""}
                onChange={(e) => handleStatusChange(order, e.target.value)}
                className="w-full px-2 py-1 rounded border text-xs"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex gap-3">
              <Eye className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => openOrder(order)} />
              <XCircle className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleAdminCancel(order)} />
              <Trash2 className="w-5 h-5 text-gray-600 cursor-pointer" onClick={() => handleDelete(order)} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-3">
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
        <div className="space-x-2">
          <button disabled={page <= 1} onClick={() => updatePage(1)} className="px-3 py-1 border rounded-lg bg-gray-100 disabled:opacity-50">⏮ First</button>
          <button disabled={page <= 1} onClick={() => updatePage(Math.max(1, page - 1))} className="px-3 py-1 border rounded-lg bg-gray-100 disabled:opacity-50">◀ Prev</button>
          <button disabled={page >= totalPages} onClick={() => updatePage(Math.min(totalPages, page + 1))} className="px-3 py-1 border rounded-lg bg-gray-100 disabled:opacity-50">Next ▶</button>
          <button disabled={page >= totalPages} onClick={() => updatePage(totalPages)} className="px-3 py-1 border rounded-lg bg-gray-100 disabled:opacity-50">Last ⏭</button>
        </div>
      </div>

      {error && <div className="mt-3 text-red-600">{error}</div>}

    </div>
  );
};

export default AdminOrders;
