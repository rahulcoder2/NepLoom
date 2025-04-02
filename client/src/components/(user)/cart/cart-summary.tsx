import React from "react";

const CartSummary = () => {
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <h2 className="font-medium text-lg mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Subtotal ( items)</span>
        <span className="text-sm">Rs. 100000</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Shipping Fee</span>
        <span className="text-sm">Rs. 125</span>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter Voucher Code"
          className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r text-sm font-medium">
          APPLY
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium">Total</span>
        <span className="text-lg font-medium text-orange-500">Rs. 100125</span>
      </div>

      <button className="w-full bg-orange-500 text-white py-3 rounded font-medium">
        PROCEED TO CHECKOUT (Rs. 100125)
      </button>
    </div>
  );
};

export default CartSummary;
