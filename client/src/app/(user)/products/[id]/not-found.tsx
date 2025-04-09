
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Product Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, the product you&apos;re looking for does not exist or may have been
        removed.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:underline font-medium text-lg"
      >
        Go back home
      </Link>
    </div>
  );
}
