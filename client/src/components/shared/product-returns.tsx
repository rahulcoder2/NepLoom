import { RotateCcw, Shield } from "lucide-react";

export default function ProductReturns() {
  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <div className="flex items-start mb-3">
        <RotateCcw className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium">14 Days Free Returns</h4>
        </div>
      </div>

      <div className="flex items-start">
        <Shield className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium">Warranty not available</h4>
        </div>
      </div>
    </div>
  );
}
