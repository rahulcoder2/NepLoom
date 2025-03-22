import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = () => {
  return (
    <div className="flex items-start border-t py-4">
      <div className="flex items-center mr-4">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
      </div>
      <div className="flex flex-1">
        <div className="mr-4">
          <Image
            src={"/placeholder.svg"}
            alt={"Product image"}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-end ml-4">
          <div className="text-orange-500 font-medium">Rs. 1000</div>
          <div className="text-gray-500 text-xs line-through">1000</div>
          <div className="flex items-center mt-4">
            <div className="flex items-center border rounded mr-2">
              <span className="px-3 py-1">10</span>
              <button className="px-2 py-1 text-gray-400 hover:text-gray-600">
                +
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
