import React from "react";
import ProductsComponent from "@/components/ProductsComponent";

const ProductsPage = ({ products, addToCart }) => {
  return (
    <div>
      <ProductsComponent initialProducts={products} addToCart={addToCart} />
    </div>
  );
};

export default ProductsPage;

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();
    return { props: { products } };
  } catch (error) {
    return { props: { products: [] } };
  }
}