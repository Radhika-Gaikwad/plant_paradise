// src/features/profile/Profile.jsx
import React, { useState, useEffect } from "react";
import { GiPlantRoots } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile } from "../../services/profileApi";
import Address from "../address/Address";
import { toast } from "react-toastify";


const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const userId = localStorage.getItem("userId"); // ✅ always read here

  const location = useLocation();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      if (!userId) {
        console.error("❌ No userId found in localStorage");
        setLoading(false);
        return;
      }
      const data = await getProfile(userId);
      setProfile(data);
      setFormData(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ fetch profile on mount or refresh
  useEffect(() => {
    fetchProfile();

    // ✅ clear refresh flag so it doesn’t loop
    if (location.state?.refresh) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [userId, location.state?.refresh, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    // TODO: call updateProfile API
    setProfile(formData);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <GiPlantRoots className="text-green-600 text-6xl animate-bounce mb-4" />
        <p className="text-lg font-medium text-gray-700">Loading Profile…</p>
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center mt-6">❌ No profile data found.</p>;
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Profile Card */}
      <div className="w-full bg-gradient-to-r from-green-200 to-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-green-800">
              {profile.name}
            </h2>
            <p className="text-gray-700">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Personal Info Card */}
      <div className="w-full bg-gradient-to-r from-green-200 to-white shadow-md rounded-lg p-4 mb-6 relative">
        <h2 className="text-lg font-semibold text-green-800 mb-4 flex justify-between items-center">
          Personal Information
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-green-700 hover:text-green-900"
            >
              <FaEdit />
            </button>
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "mobile", "email", "gender"].map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-700 capitalize">
                {field}
              </label>
              {editing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-800">{profile[field]}</p>
              )}
            </div>
          ))}
        </div>

        {editing && (
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => {
                setFormData(profile);
                setEditing(false);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Addresses Card */}
      <Address />
    </div>
  );
};

export default Profile;
