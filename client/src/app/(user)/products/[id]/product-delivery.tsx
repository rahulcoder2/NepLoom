import { Truck, Package } from "lucide-react";

export default function ProductDelivery() {
  return (
    <div className="border rounded-md p-4 bg-gray-50 mb-4">
      <div className="flex items-start mb-3">
        <Truck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium">Standard Delivery</h4>
          <p className="text-xs text-gray-500">Estimated in 3-5 days</p>
        </div>
        <div className="ml-auto text-right">
          <span className="text-sm font-medium">Rs. 85</span>
        </div>
      </div>

      <div className="flex items-start">
        <Package className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium">Cash on Delivery Available</h4>
        </div>
      </div>
    </div>
  );
}
