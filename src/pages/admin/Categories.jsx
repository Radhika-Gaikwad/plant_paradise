import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllSubCategories,
  deleteCategory,
  deleteSubCategory,
} from "../../services/categoryService";
import AddCategoryForm from "../../components/admin/AddCategoryForm";
import EditCategoryForm from "../../components/admin/EditCategoryForm";
import AddSubCategoryForm from "../../components/admin/AddSubCategoryForm";
import EditSubCategoryForm from "../../components/admin/EditSubCategoryForm";
import { showToast } from "../../utils/showToast";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  // subcategory modals
  const [addSubFor, setAddSubFor] = useState(null); // category object
  const [editSub, setEditSub] = useState(null); // subcategory object

  // Delete confirmation modal
  const [deleteTarget, setDeleteTarget] = useState(null);

  // expand/collapse
  const [expanded, setExpanded] = useState(new Set());

  const toggleExpand = (categoryId) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(categoryId) ? next.delete(categoryId) : next.add(categoryId);
      return next;
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cats, subs] = await Promise.all([
        getAllCategories(),
        getAllSubCategories(),
      ]);
      setCategories(cats);
      setSubCategories(subs);
    } catch (err) {
      console.error("Error fetching data:", err);
      showToast("❌ Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "category") {
        await deleteCategory(deleteTarget.id);
        showToast("✅ Category deleted successfully!", "success");
      } else {
        await deleteSubCategory(deleteTarget.id);
        showToast("✅ Subcategory deleted successfully!", "success");
      }
      await fetchData();
    } catch (err) {
      showToast("❌ Failed to delete", "error");
      console.error("Delete failed", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Manage Categories</h1>

      <button
        onClick={() => setShowForm(true)}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
      >
        ➕ Add Category
      </button>

{/* Table */}
<div className="overflow-x-auto shadow-lg hidden sm:block rounded-xl">
  <table className="w-full border-collapse bg-white">
    <thead className="bg-green-200 text-green-900">
      <tr>
        <th className="p-3 w-12 text-center">+</th>
        <th className="p-3 text-left w-20">S.No</th>
        <th className="p-3 text-left w-24">Image</th>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Active</th>
        <th className="p-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((cat, idx) => {
        const isOpen = expanded.has(cat.categoryId);
        const subs = subCategories.filter(
          (s) => s.categoryId === cat.categoryId
        );
        return (
          <React.Fragment key={cat.categoryId}>
            {/* Category Row */}
            <tr className="border-b hover:bg-green-50">
              <td className="p-3 text-center">
                <button
                  onClick={() => toggleExpand(cat.categoryId)}
                  aria-expanded={isOpen}
                  className="w-8 h-8 rounded-full border hover:bg-green-100"
                  title={isOpen ? "Collapse" : "Expand"}
                >
                  {isOpen ? "−" : "＋"}
                </button>
              </td>
              <td className="p-3">{idx + 1}</td>
              <td className="p-3">
                <img
                  src={
                    cat.imageUrl || "https://via.placeholder.com/40?text=📷"
                  }
                  alt={cat.categoryName}
                  className="w-10 h-10 object-cover rounded border"
                />
              </td>
              <td className="p-3 font-semibold text-green-800">
                {cat.categoryName}
              </td>
              <td className="p-3">
                {cat.isActive ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    Inactive
                  </span>
                )}
              </td>
              <td className="p-3 text-center space-x-2 space-y-2">
                <button
                  onClick={() => setEditCategory(cat)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setDeleteTarget({ type: "category", id: cat.categoryId })
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
                >
                  Delete
                </button>
              </td>
            </tr>

            {/* Expanded subcategory panel */}
            {isOpen && (
              <tr className="bg-gray-50 border-b">
                <td colSpan={6} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">
                      Subcategories of{" "}
                      <span className="text-green-700">
                        {cat.categoryName}
                      </span>
                    </h3>
                    <button
                      onClick={() => setAddSubFor(cat)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
                    >
                      ➕ Add Subcategory
                    </button>
                  </div>

                  {subs.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No subcategories yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border bg-white rounded-lg">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 text-left w-24">S.No</th>
                            <th className="p-2 text-left">Image</th>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Active</th>
                            <th className="p-2 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subs.map((sub, sIdx) => (
                            <tr key={sub.subCategoryId} className="border-t">
                              <td className="p-2">
                                {idx + 1}.{sIdx + 1}
                              </td>
                              <td className="p-2">
                                <img
                                  src={
                                    sub.imageUrl ||
                                    "https://via.placeholder.com/40?text=📷"
                                  }
                                  alt={sub.subCategoryName}
                                  className="w-10 h-10 object-cover rounded border"
                                />
                              </td>
                              <td className="p-2">{sub.subCategoryName}</td>
                              <td className="p-2">
                                {sub.isActive ? (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                    Active
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                                    Inactive
                                  </span>
                                )}
                              </td>
                              <td className="p-2 text-center space-x-2">
                                <button
                                  onClick={() => setEditSub(sub)}
                                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    setDeleteTarget({
                                      type: "subcategory",
                                      id: sub.subCategoryId,
                                    })
                                  }
                                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  </table>
</div>

{/* Card View for Mobile */}
<div className="grid gap-4 sm:hidden">
  {categories.map((cat, idx) => {
    const isOpen = expanded.has(cat.categoryId);
    const subs = subCategories.filter(
      (s) => s.categoryId === cat.categoryId
    );

    return (
      <div
        key={cat.categoryId}
        className="bg-white p-4 rounded-lg shadow border"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={cat.imageUrl || "https://via.placeholder.com/40?text=📷"}
              alt={cat.categoryName}
              className="w-10 h-10 object-cover rounded border"
            />
            <h2 className="font-bold text-green-800">{cat.categoryName}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                cat.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {cat.isActive ? "Active" : "Inactive"}
            </span>
            <button
              onClick={() => toggleExpand(cat.categoryId)}
              className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100"
            >
              {isOpen ? "−" : "＋"}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500">S.No: {idx + 1}</p>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setEditCategory(cat)}
            className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
          >
            Edit
          </button>
          <button
            onClick={() =>
              setDeleteTarget({ type: "category", id: cat.categoryId })
            }
            className="flex-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
          >
            Delete
          </button>
        </div>

        {/* Subcategories (collapsible) */}
        {isOpen && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700 text-sm">
                Subcategories:
              </h3>
              <button
                onClick={() => setAddSubFor(cat)}
                className="px-2 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700"
              >
                ➕ Add
              </button>
            </div>
            {subs.length === 0 ? (
              <p className="text-sm text-gray-500">No subcategories yet.</p>
            ) : (
              <div className="grid gap-2">
                {subs.map((sub) => (
                  <div
                    key={sub.subCategoryId}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          sub.imageUrl ||
                          "https://via.placeholder.com/40?text=📷"
                        }
                        alt={sub.subCategoryName}
                        className="w-10 h-10 object-cover rounded border"
                      />
                      <span className="text-sm">{sub.subCategoryName}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditSub(sub)}
                        className="px-2 py-1 bg-blue-500 text-white rounded-lg text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setDeleteTarget({
                            type: "subcategory",
                            id: sub.subCategoryId,
                          })
                        }
                        className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  })}
</div>


      {/* Add Category */}
      {showForm && (
        <AddCategoryForm onClose={() => setShowForm(false)} onSuccess={fetchData} />
      )}

      {/* Edit Category */}
      {editCategory && (
        <EditCategoryForm
          category={editCategory}
          onClose={() => setEditCategory(null)}
          onSuccess={fetchData}
        />
      )}

      {/* Add Subcategory */}
      {addSubFor && (
        <AddSubCategoryForm
          categoryId={addSubFor.categoryId}
          onClose={() => setAddSubFor(null)}
          onSuccess={fetchData}
        />
      )}

      {/* Edit Subcategory */}
      {editSub && (
        <EditSubCategoryForm
          subCategory={editSub}
          onClose={() => setEditSub(null)}
          onSuccess={fetchData}
        />
      )}

      {/* Custom Delete Popup */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this{" "}
              {deleteTarget.type === "category" ? "category" : "subcategory"}?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
