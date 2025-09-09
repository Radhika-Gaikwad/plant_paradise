import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllAddresses, deleteAddress } from "../../services/profileApi";
import { toast } from "react-toastify";


const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchAddresses = async () => {
    try {
      if (!userId) return;
      const data = await getAllAddresses(userId);
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId, location.state?.refresh]); // refetch after add/edit

  /*const handleDelete = async (addr) => {
    const addressId = addr._id; // use _id for MongoDB
    try {
      await deleteAddress(userId, addressId);
      setAddresses(addresses.filter((a) => a._id !== addr._id));
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };
  const handleDelete = async (addr) => {
  const addressId = addr.id; // 👈 use UUID
    try {
    await deleteAddress(userId, addressId);
    setAddresses(addresses.filter((a) => a.id !== addr.id));
    } catch (err) {
    console.error("Error deleting address:", err);
    }
  };*/
  const handleDelete = async (addr) => {
  const addressId = addr.id;// support both UUID and Mongo
  try {
    await deleteAddress(userId, addressId);
    setAddresses(addresses.filter((a) => (a.id) !== addressId));
    toast.success("Address deleted successfully 🗑️");
  } catch (err) {
    console.error("Error deleting address:", err);
    toast.error("Failed to delete address ❌");
  }
};


  if (loading) return <p className="text-gray-600">Loading addresses…</p>;

  return (
    <div className="w-full mt-4 bg-gradient-to-r from-green-200 to-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-800">Addresses</h2>
        <button
          onClick={() => navigate("/add-address")}
          className="text-green-700 hover:text-green-900 flex items-center gap-1"
        >
          <FaPlus size={20} /> <span className="font-medium">Add</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between"
            >
              <div className="text-gray-800 text-sm leading-relaxed">
                <p className="font-medium">
                  {addr.name} ({addr.addressType || "Home"})
                </p>
                <p>
                  {addr.houseNo}, {addr.streetName}
                </p>
                <p>
                  {addr.city}, {addr.state} - {addr.zipcode}
                </p>
                <p>
                  📞 {addr.phoneNo}
                  {addr.alterPhoneNo && ` | Alt: ${addr.alterPhoneNo}`}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() =>
                    navigate("/add-address", { state: { editData: addr } })
                  }
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(addr)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;
