import React, { useState, useEffect } from "react";
import { GiPlantRoots } from "react-icons/gi";
import Address from "../address/Address";
import { getProfile, updateProfile } from "../../services/profileApi"; // ✅ import API

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const userId = localStorage.getItem("userId"); // store this at login/signup
  const [profile, setProfile] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({});
  const [tempInfo, setTempInfo] = useState({});

  // ✅ Fetch profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(userId);
        setProfile({
          username: data.username,
          email: data.email,
        });
        setPersonalInfo({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          gender: data.gender,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleEdit = () => {
    setTempInfo({ ...personalInfo });
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const updated = await updateProfile(userId, tempInfo);
      setPersonalInfo({
        name: updated.name,
        email: updated.email,
        mobile: updated.mobile,
        gender: updated.gender,
      });
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => setEditing(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <GiPlantRoots className="text-green-600 text-6xl animate-bounce mb-4" />
        <div className="w-32 h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading Profile…</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Profile Card */}
      <div className="w-full bg-gradient-to-r from-green-200 to-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
            {profile?.username?.charAt(0)}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-green-800">
              {profile?.username}
            </h2>
            <p className="text-gray-700">{profile?.email}</p>
          </div>
        </div>
      </div>

      {/* Personal Info Card */}
      <div className="w-full bg-gradient-to-r from-green-200 to-white shadow-md rounded-lg p-4 relative mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-green-800">
            Personal Information
          </h2>
          {!editing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-1 border border-green-600 text-green-700 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700">Name</label>
            {editing ? (
              <input
                type="text"
                value={tempInfo.name || ""}
                onChange={(e) =>
                  setTempInfo({ ...tempInfo, name: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <p className="text-gray-800">{personalInfo.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm text-gray-700">Mobile</label>
            {editing ? (
              <input
                type="text"
                value={tempInfo.mobile || ""}
                onChange={(e) =>
                  setTempInfo({ ...tempInfo, mobile: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <p className="text-gray-800">{personalInfo.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            {editing ? (
              <input
                type="email"
                value={tempInfo.email || ""}
                onChange={(e) =>
                  setTempInfo({ ...tempInfo, email: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <p className="text-gray-800">{personalInfo.email}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-700">Gender</label>
            {editing ? (
              <select
                value={tempInfo.gender || ""}
                onChange={(e) =>
                  setTempInfo({ ...tempInfo, gender: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            ) : (
              <p className="text-gray-800">{personalInfo.gender}</p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Address Section */}
      <Address />
    </div>
  );
};

export default Profile;
