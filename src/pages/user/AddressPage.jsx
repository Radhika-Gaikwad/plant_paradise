// src/pages/AddressPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "../../services/addressService";

const emptyForm = {
  name: "",
  phoneNo: "",
  alterPhoneNo: "",
  houseNo: "",
  streetName: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
  addressType: "home",
};

const validate = (form) => {
  const errors = {};
  if (!form.name || form.name.trim().length < 2) errors.name = "Enter a valid name";
  if (!form.phoneNo || !/^\d{10}$/.test(form.phoneNo)) errors.phoneNo = "Enter 10 digit phone";
  if (!form.houseNo) errors.houseNo = "House/Flat no required";
  if (!form.streetName) errors.streetName = "Street is required";
  if (!form.city) errors.city = "City is required";
  if (!form.district) errors.district = "District is required";
  if (!form.pincode || !/^\d{5,6}$/.test(form.pincode)) errors.pincode = "Enter valid pincode";
  if (!["home", "office"].includes(form.addressType)) errors.addressType = "Select address type";
  return errors;
};

export default function AddressPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const originState = location.state || {};

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getUserAddresses();
      setAddresses(data);
      setLoading(false);

      if (originState.mode === "edit" && originState.address) {
        const addr = originState.address;
        setEditingId(addr._id);
        setForm({
          name: addr.name || "",
          phoneNo: addr.phoneNo || "",
          alterPhoneNo: addr.alterPhoneNo || "",
          houseNo: addr.houseNo || "",
          streetName: addr.streetName || "",
          city: addr.city || "",
          district: addr.district || "",
          state: addr.state || "",
          pincode: addr.pincode || "",
          addressType: addr.addressType || "home",
        });
      }
    }
    load();
    // eslint-disable-next-line
  }, []);

  const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      if (editingId) {
        await updateUserAddress(editingId, form);
      } else {
        await addUserAddress(form);
      }
      const data = await getUserAddresses();
      setAddresses(data);

      if (originState.from === "checkout") {
        navigate(-1);
      } else {
        setForm(emptyForm);
        setEditingId(null);
      }
    } catch (err) {}
  };

  const handleEdit = (addr) => {
    setEditingId(addr._id);
    setForm({
      name: addr.name || "",
      phoneNo: addr.phoneNo || "",
      alterPhoneNo: addr.alterPhoneNo || "",
      houseNo: addr.houseNo || "",
      streetName: addr.streetName || "",
      city: addr.city || "",
      district: addr.district || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      addressType: addr.addressType || "home",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this address?")) return;
    try {
      await deleteUserAddress(id);
      const data = await getUserAddresses();
      setAddresses(data);
    } catch (err) {}
  };

  return (
    <div className="container mx-auto ">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium shadow-sm"
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Saved Addresses */}
        <div className="md:p-6 p-2 border rounded-2xl bg-white shadow-md">
          <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
          {loading ? (
            <div>Loading...</div>
          ) : addresses.length === 0 ? (
            <div className="text-gray-500">No addresses saved yet.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {addresses.map((a) => (
                <div
                  key={a._id}
                  className="lg:p-4 p-1 border rounded-xl bg-gray-50 shadow-sm relative hover:shadow-md transition"
                >
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex gap-2 mb-3">
                    <button
                      onClick={() => handleEdit(a)}
                      className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="px-3 py-1 text-sm rounded bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="font-medium text-lg">{a.name}</div>
                  <div className="text-sm text-gray-600">
                    {a.houseNo}, {a.streetName}, {a.city}, {a.district} - {a.pincode}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    📞 {a.phoneNo} | {a.addressType}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Address Form */}
        <div className="p-6 border rounded-2xl bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>

          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
              {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="text-sm font-medium">Phone number</label>
              <input
                value={form.phoneNo}
                onChange={(e) => handleChange("phoneNo", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
              {errors.phoneNo && <div className="text-red-500 text-xs mt-1">{errors.phoneNo}</div>}
            </div>

            <div>
              <label className="text-sm font-medium">Alternate phone</label>
              <input
                value={form.alterPhoneNo}
                onChange={(e) => handleChange("alterPhoneNo", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Address type</label>
              <select
                value={form.addressType}
                onChange={(e) => handleChange("addressType", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
              </select>
              {errors.addressType && (
                <div className="text-red-500 text-xs mt-1">{errors.addressType}</div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">House / Flat No</label>
              <input
                value={form.houseNo}
                onChange={(e) => handleChange("houseNo", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
              {errors.houseNo && <div className="text-red-500 text-xs mt-1">{errors.houseNo}</div>}
            </div>

            <div>
              <label className="text-sm font-medium">Street / Locality</label>
              <input
                value={form.streetName}
                onChange={(e) => handleChange("streetName", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
              {errors.streetName && (
                <div className="text-red-500 text-xs mt-1">{errors.streetName}</div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">City</label>
              <input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
              {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
            </div>

            <div>
              <label className="text-sm font-medium">District</label>
              <input
                value={form.district}
                onChange={(e) => handleChange("district", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
              {errors.district && <div className="text-red-500 text-xs mt-1">{errors.district}</div>}
            </div>

            <div>
              <label className="text-sm font-medium">State</label>
              <input
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Pincode</label>
              <input
                value={form.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
              {errors.pincode && <div className="text-red-500 text-xs mt-1">{errors.pincode}</div>}
            </div>

            <div className="md:col-span-2 flex gap-3 mt-4">
              <button
                type="submit"
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm"
              >
                {editingId ? "Update Address" : "Add Address"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                }}
                className="px-5 py-2 border rounded-lg hover:bg-gray-100"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
