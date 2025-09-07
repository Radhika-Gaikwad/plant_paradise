import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//import { getAllAddresses, deleteAddress } from "../../services/addressApi";
import {
 // getAllAddresses,
  //addAddress,
  //updateAddress,
  //deleteAddress,
} from "../../services/profileApi";


const Address = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAllAddresses(userId);
        setAddresses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter((a) => a._id !== id)); // filter by _id
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  if (loading) return <p className="text-gray-600">Loading addresses…</p>;

  return (
    <div className="w-full mt-4 bg-gradient-to-r from-green-200 to-white rounded-xl shadow-md p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-800">Address</h2>
        <button
          onClick={() => navigate("/add-address")}
          className="text-green-700 hover:text-green-900 flex items-center gap-1"
        >
          <FaPlus size={20} /> <span className="font-medium">Add</span>
        </button>
      </div>

      {/* Addresses Grid */}
      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((addr) => (
            <div key={addr._id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between">
              <div className="text-gray-800 text-sm leading-relaxed">
                <p className="font-medium">
                  {addr.fullName} ({addr.type || "Home"})
                </p>
                <p>{addr.house} {addr.street}</p>
                <p>{addr.city} - {addr.pincode}</p>
                <p>📞 {addr.phone}{addr.alternate && ` | Alt: ${addr.alternate}`}</p>
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => navigate("/add-address", { state: { editData: addr } })}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
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
