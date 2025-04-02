import ProductCard from "../../shared/product-card";

const displayProducts = [
  {
    _id: "1",
    name: "Product 1",
    price: 100,
    mainImage: { url: "/images/product/product-1.jpg" },
    ratings: 4.5,
    stock: 10,
  },
  {
    _id: "2",
    name: "Product 2",
    price: 200,
    mainImage: { url: "/images/product/product-2.jpg" },
    ratings: 3.8,
    stock: 0, // Out of stock
  },
  {
    _id: "3",
    name: "Product 3",
    price: 300,
    mainImage: { url: "/images/product/product-3.jpg" },
    ratings: 5,
    stock: 5,
  },
  {
    _id: "4",
    name: "Product 4",
    price: 400,
    mainImage: { url: "/images/product/product-4.jpg" },
    ratings: 2.2,
    stock: 15,
  },
  {
    _id: "5",
    name: "Product 5",
    price: 500,
    mainImage: { url: "/images/product/product-5.jpg" },
    ratings: 4,
    stock: 8,
  },
  {
    _id: "6",
    name: "Product 6",
    price: 600,
    mainImage: { url: "/images/product/product-6.jpg" },
    ratings: 4.7,
    stock: 20,
  },
  {
    _id: "7",
    name: "Product 7",
    price: 700,
    mainImage: { url: "/images/product/product-7.jpg" },
    ratings: 3.5,
    stock: 3,
  },
  {
    _id: "8",
    name: "Product 8",
    price: 800,
    mainImage: { url: "/images/product/product-8.jpg" },
    ratings: 1.9,
    stock: 12,
  },
  {
    _id: "9",
    name: "Product 9",
    price: 900,
    mainImage: { url: "/images/product/product-9.jpg" },
    ratings: 4.3,
    stock: 7,
  },
  {
    _id: "10",
    name: "Product 10",
    price: 1000,
    mainImage: { url: "/images/product/product-10.jpg" },
    ratings: 2.8,
    stock: 9,
  },
];

const ProductSection = () => {
  return (
    <>
      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {displayProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default ProductSection;
