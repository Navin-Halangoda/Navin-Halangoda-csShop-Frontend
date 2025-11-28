import React, { useState } from "react";
import Modal from "react-modal";

export default function Vieworderinfocustomer({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="w-[90%] md:w-[450px] bg-white rounded-2xl shadow-2xl p-6 mx-auto mt-20 outline-none animate-fadeIn"
        overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Details
        </h2>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
          <p><span className="font-semibold">Name:</span> {order.name}</p>
          <p><span className="font-semibold">Email:</span> {order.email}</p>
          <p><span className="font-semibold">Phone:</span> {order.phone}</p>
          <p><span className="font-semibold">Address:</span> {order.address}</p>
            <span className="font-semibold">Status:</span>
            <div className="flex flex-row">
            <span
              className={`px-3 py-1 rounded-full text-white text-xs ${
                order.status === "pending"
                  ? "bg-yellow-500"
                  : order.status === "processing"
                  ? "bg-blue-500"
                  : order.status === "Cansel"
                  ? "bg-red-600"
                  : order.status === "completed"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {order.status}
            </span>
            <select value={order.status}
            disabled
            className="ml-4 px-2 py-1 border-secondary/20 rounded-lg text-sm text-secondary outline-none"
            >
                <option value="pending">Pending</option>
                <option value="processing">processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            
                 
            </select>
            </div>
          

          <p><span className="font-semibold">Total:</span> Rs. {order.total}</p>
        </div>
          <p><span className="font-semibold">Additional notes</span> </p>
          <textarea className="text-sm text-secondary whitespace-pre-line w-full" value={order.notes} 
          disabled></textarea>
          

        <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">
          Items
        </h3>

        <div className="max-h-52 overflow-y-auto pr-2 space-y-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 bg-gray-100 p-3 rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-xs text-gray-600">
                  Price: Rs. {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
  
      </Modal>

      <button
        className="bg-accent/70 hover:bg-accent px-4 py-2 rounded-lg text-white cursor-pointer transition font-medium shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        View Info
      </button>
    </>
  );
}
