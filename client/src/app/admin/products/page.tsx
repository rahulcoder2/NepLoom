"use client";
import Container from "@/components/shared/container";
import { columns } from "@/components/(admin)/product/table/columns";
import { ProductDataTable } from "@/components/(admin)/product/table/product-data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProductsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]); // Initialize products state

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data?.products?.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts(); // Call the function to fetch products

    // No cleanup needed in this case, so remove the return statement.
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="w-full mt-6">
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl md:text-3xl text-primary font-bold tracking-tight">
              Products
            </h2>
            <Button
              className="h-11 px-4 py-2 md:px-6 md:py-3 flex items-center justify-center whitespace-nowrap"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          <ProductDataTable data={products} columns={columns} />
        </div>
      </Container>
    </div>
  );
};

export default AdminProductsPage;
