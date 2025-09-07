import React, { useEffect, useState, useMemo } from "react";
import { getAllProducts } from "../../services/productApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Edit, Trash, Eye  } from "lucide-react";
import EditProductForm from "./EditProductForm";
import { deleteProduct } from "../../services/productApi";
import { showToast } from "../../utils/showToast";
import { useNavigate } from "react-router-dom";
import { GiPlantRoots } from "react-icons/gi";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
 const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  // 🔹 Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await deleteProduct(deletingProduct.productId);
      showToast("🗑️ Product deleted!", "success");
      setDeletingProduct(null);
      fetchProducts(); // refresh
    } catch (err) {
      showToast("❌ Failed to delete", "error");
    }
  };
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Define columns
  const columns = useMemo(
    () => [
      {
        header: "SN",
        accessorFn: (_row, i) => i + 1,
      },
      { header: "Product Name", accessorKey: "productName" },
      { header: "Category", accessorKey: "category" },
      { header: "Sub Category", accessorKey: "subCategory" },
      { header: "Quantity", accessorKey: "quantity" },
      {
        header: "Stock",
        accessorFn: (row) => (row.stock ? "Available" : "Out of Stock"),
      },
      { header: "Price (₹)", accessorKey: "price" },
      { header: "Discount (%)", accessorKey: "discount" },
      { header: "Unit", accessorKey: "unit" },
      { header: "Rating", accessorKey: "overAllRating" },
      {
        header: "Images",
        accessorKey: "imageUrl",
        cell: ({ getValue }) => {
          const value = getValue();
          return value && value.length > 0 ? (
            <div className="w-auto">
              <Slider
                dots
                infinite={false}
                speed={300}
                slidesToShow={1}
                slidesToScroll={1}
                arrows={false}
              >
                {value.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="product"
                    className=" object-cover rounded shadow mx-auto"
                    loading="lazy"
                  />
                ))}
              </Slider>
            </div>
          ) : (
            <span>No Image</span>
          );
        },
      },
      {
        header: "Videos",
        accessorKey: "video",
        cell: ({ getValue }) => {
          const value = getValue();
          return value && value.length > 0 ? (
            <div className="w-auto">
              <Slider
                dots
                infinite
                speed={300}
                slidesToShow={1}
                slidesToScroll={1}
              >
                {value.map((vid, idx) => (
                  <video
                    key={idx}
                    src={vid}
                    controls
                    className=" rounded shadow"
                  />
                ))}
              </Slider>
            </div>
          ) : (
            <span>No Video</span>
          );
        },
      },
      {
        header: "Created On",
        accessorFn: (row) => new Date(row.createdOn).toLocaleDateString(),
      },
 {
     header: "See More",
      cell: ({ row }) => {
        const productId = row.original.productId; // must be included in table data
        return (
          <button
            onClick={() => navigate(`productDetails/${productId}`)}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            <Eye className="w-4 h-4" />
          </button>
        );
      },
},
  {
    header: "Actions",
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={() => setEditingProduct(product)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeletingProduct(product)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          );
        },
},
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          <GiPlantRoots className="text-green-600 text-6xl animate-bounce mb-4" />
          <div className="w-32 h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading Products…</p>
        </div>
      );
    }
  

  return (
    <div className=" bg-gray-50 rounded-xl shadow-xl flex flex-col">
      {/* 🔍 Search & Page Size */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-lg w-1/2 md:w-1/3 shadow-sm focus:ring focus:ring-green-300"
        />
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="px-4 py-2 border rounded-lg shadow-sm"
        >
          <option value={5}>Show 5</option>
          <option value={8}>Show 8</option>
          <option value={10}>Show 10</option>
        </select>
      </div>

      {/* 🌟 Table Wrapper with scroll (fixed) */}
      {/* IMPORTANT CHANGES:
          - Use overflow-auto (both axes) + max-h to keep table inside the box and show internal scrollbars
          - Use table-fixed so columns respect widths and the horizontal scrollbar behaves
          - Allow wrapping (whitespace-normal + break-words) for most cells to avoid huge single-line overflow
          - Keep first column sticky so SN stays visible
      */}
    <div className="overflow-auto border rounded-lg max-h-[70vh] hidden md:block">
  <table className="min-w-full w-[180%] table-fixed border-collapse">
       <thead className="bg-gradient-to-r from-green-200 to-green-400 text-gray-800 sticky top-0 z-30">
  {table.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header, idx) => (
        <th
          key={header.id}
          onClick={header.column.getToggleSortingHandler()}
          className={`px-4 py-3 border text-sm font-semibold text-left cursor-pointer select-none
            ${idx === 0 
              ? "sticky left-0 bg-green-300 z-20 w-12 text-center" 
              : "whitespace-normal break-words"} 
            ${
              header.column.columnDef.header === "Product Name" ? "min-w-[400px]" : ""
            }
            ${
              header.column.columnDef.header === "Category" ? "min-w-[400px]" : ""
            }
            ${
              header.column.columnDef.header === "Sub Category" ? "min-w-[400px]" : ""
            }
            ${
              header.column.columnDef.header === "Images" ? "min-w-[400px]" : ""
            }
            ${
              header.column.columnDef.header === "Videos" ? "min-w-[400px]" : ""
            }
          `}
        >
          {flexRender(
            header.column.columnDef.header,
            header.getContext()
          )}
          {header.column.getIsSorted() === "asc"
            ? " 🔼"
            : header.column.getIsSorted() === "desc"
            ? " 🔽"
            : ""}
        </th>
      ))}
    </tr>
  ))}
</thead>

          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell, idx) => (
                  <td
                    key={cell.id}
                    className={`border text-sm align-top
                      ${idx === 0 ? "sticky left-0 bg-white z-10 w-10 px-3 py-2 text-center whitespace-nowrap" : "px-4 py-3 whitespace-normal break-words"}
                    `}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>


  <div className="grid gap-4 md:hidden">
    {products.map((product, i) => (
      <div
        key={product._id || i}
        className="border rounded-xl p-4 shadow bg-white flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold">{product.productName}</h3>
          <span className="text-xs sm:text-sm text-gray-500">
            {new Date(product.createdOn).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {product.category} / {product.subCategory}
        </p>

        {/* Images */}
        {product.imageUrl?.length > 0 ? (
          <Slider dots infinite={false} arrows={false} slidesToShow={1}>
            {product.imageUrl.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="product"
                className="w-full h-44 sm:h-56 object-cover rounded"
              />
            ))}
          </Slider>
        ) : (
          <span className="text-sm text-gray-500">No Image</span>
        )}

        {/* Videos */}
        {product.video?.length > 0 ? (
          <Slider dots infinite={false} arrows={false} slidesToShow={1}>
            {product.video.map((vid, idx) => (
              <video
                key={idx}
                src={vid}
                controls
                className="w-full h-44 sm:h-56 rounded"
              />
            ))}
          </Slider>
        ) : (
          <span className="text-sm text-gray-500">No Video</span>
        )}

        {/* Stock, Quantity, Price */}
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <p>Qty: {product.quantity}</p>
          <p>Stock: {product.stock ? "Available" : "Out of Stock"}</p>
          <p>Price: ₹{product.price}</p>
          <p>Discount: {product.discount}%</p>
          <p>Unit: {product.unit}</p>
          <p>Rating: {product.overAllRating}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center sm:justify-end gap-3">
          <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
    ))}
  </div>

      {/* 📌 Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-3">
        <div className="text-sm text-gray-600">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            ⏮ First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next ▶
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Last ⏭
          </button>
        </div>
      </div>

       {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={fetchProducts}
        />
      )}

      {/* 🗑️ Delete Confirmation */}
      {deletingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600 my-3">Do you really want to delete <b>{deletingProduct.productName}</b>?</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setDeletingProduct(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
