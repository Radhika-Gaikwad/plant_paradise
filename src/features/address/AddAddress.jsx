import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addAddress, updateAddress } from "../../services/profileApi";
import { toast } from "react-toastify";


const AddAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    alterPhoneNo: "",
    houseNo: "",
    streetName: "",
    city: "",
    state: "",
    zipcode: "",
    district: "",
    type: "Home",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        type: editData.addressType || "home",
        zipcode: editData.pincode || "",
        district: editData.district || "",
      });
    }
  }, [editData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let newErrors = {};
    ["name", "phoneNo", "houseNo", "streetName", "city", "state", "zipcode"].forEach(
      (field) => {
        if (!formData[field]) newErrors[field] = `${field} is required`;
      }
    );
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();
  if (Object.keys(newErrors).length === 0) {
    try {
      const payload = {
        name: formData.name,
        phoneNo: formData.phoneNo,
        alterPhoneNo: formData.alterPhoneNo,
        houseNo: formData.houseNo,
        streetName: formData.streetName,
        city: formData.city,
        district: formData.district,
        pincode: formData.zipcode,        // ✅ map zipcode → pincode
        addressType: formData.type.toLowerCase(),
      };

      /*if (editData?.id) {
        await updateAddress(userId, editData.id, payload);
        console.log("Address updated successfully");
      } else {
        await addAddress(userId, payload);
        console.log("Address added successfully");
      }

      navigate("/profile", { state: { refresh: true } });
      } catch (err) {
      console.error("Error saving address:", err.response?.data || err);
      }
      } else {
        setErrors(newErrors);
      }
    };*/
     if (editData?.id || editData?._id) {
        // EDIT
        const addressId = editData.id || editData._id;
        await updateAddress(userId, addressId, payload);
        toast.success("Address updated successfully ✅");
      } else {
        // ADD
        await addAddress(userId, payload);
        toast.success("Address added successfully 🎉");
      }

      navigate("/profile", { state: { refresh: true } });
    } catch (err) {
      console.error("Error saving address:", err);
      toast.error("Failed to save address ❌");
    }
  } else {
    setErrors(newErrors);
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          {editData ? "Edit Address" : "Add New Address"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {Object.entries({
            name: "Full Name",
            phoneNo: "Phone",
            alterPhoneNo: "Alternate Phone",
            houseNo: "House No",
            streetName: "Street",
            city: "City",
            state: "State",
            zipcode: "Zipcode",
            district: "District",
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>home</option>
              <option>office</option>
              <option>other</option>
            </select>
          </div>

          <div className="col-span-full flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
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
