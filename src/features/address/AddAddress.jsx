import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;
  const editIndex = location.state?.index;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    pincode: "",
    type: "Home",
    alternate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.house) newErrors.house = "House number is required";
    if (!formData.street) newErrors.street = "Street is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
      if (editIndex !== undefined) {
        savedAddresses[editIndex] = formData;
      } else {
        savedAddresses.push(formData);
      }
      localStorage.setItem("addresses", JSON.stringify(savedAddresses));
      navigate("/profile"); // redirect back to profile
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    navigate("/profile"); // go back without saving
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-500 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          {editData ? "Edit Address" : "Add New Address"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* House */}
          <div>
            <label className="block text-sm font-medium">House</label>
            <input
              type="text"
              name="house"
              value={formData.house}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.house && <p className="text-red-500 text-sm">{errors.house}</p>}
          </div>

          {/* Street */}
          <div>
            <label className="block text-sm font-medium">Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>Home</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
