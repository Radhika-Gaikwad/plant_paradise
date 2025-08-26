import React, { useState, useEffect } from "react";
import { GiPlantRoots } from "react-icons/gi";
import Address from "../address/Address"; // ✅ Import Address component

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Profile Info
  const [profile] = useState({
    username: "Pallavi",
    email: "pallavi@example.com",
  });

  // Personal Info (editable)
  const [personalInfo, setPersonalInfo] = useState({
    name: "Pallavi Hon",
    email: "pallavi@example.com",
    mobile: "9876543210",
    gender: "Female",
  });

  const [tempInfo, setTempInfo] = useState({ ...personalInfo });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = () => {
    setTempInfo({ ...personalInfo }); // Copy current data
    setEditing(true);
  };

  const handleSave = () => {
    setPersonalInfo(tempInfo); // Save changes
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false); // Discard changes
  };

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
            {profile.username.charAt(0)}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-green-800">
              {profile.username}
            </h2>
            <p className="text-gray-700">{profile.email}</p>
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
              className="text-green-700 font-medium hover:underline"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
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
                value={tempInfo.name}
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
                value={tempInfo.mobile}
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
                value={tempInfo.email}
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
                value={tempInfo.gender}
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

      {/* ✅ Imported Address Component */}
      <Address />
    </div>
  );
};

export default Profile;
