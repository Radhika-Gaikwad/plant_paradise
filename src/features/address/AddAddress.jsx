import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import { addAddress, updateAddress } from "../../services/addressApi";

const AddAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
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
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        if (editData?._id) {
          await updateAddress(editData._id, formData);
        } else {
          await addAddress(userId, formData);
        }
        navigate("/profile");
      } catch (err) {
        console.error("Error saving address:", err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-transparent-100 p-6">
      <div className="bg-green-50 rounded-2xl shadow-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          {editData ? "Edit Address" : "Add New Address"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* form inputs same as before */}
          {/* ... keep your inputs and validation messages ... */}

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
