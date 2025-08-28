import React from "react";

const ProductTable = () => {
  const products = [
    { id: 1, name: "Aloe Vera", price: 250, stock: 30 },
    { id: 2, name: "Snake Plant", price: 400, stock: 12 },
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">ID</th>
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Price</th>
            <th className="border p-3 text-left">Stock</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border p-3">{product.id}</td>
              <td className="border p-3">{product.name}</td>
              <td className="border p-3">₹{product.price}</td>
              <td className="border p-3">{product.stock}</td>
              <td className="border p-3 text-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
