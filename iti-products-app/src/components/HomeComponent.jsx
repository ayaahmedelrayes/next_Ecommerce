import React from "react";
import Link from "next/link";

const HomeComponent = () => {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to ITI Store</h1>
      <p className="text-muted">Browse our products and manage your inventory</p>
      <Link href="/products" className="btn btn-dark mt-3">
        Go to Products
      </Link>
    </div>
  );
};

export default HomeComponent;