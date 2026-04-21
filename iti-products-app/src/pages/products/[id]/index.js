import React from "react";
import Link from "next/link";

const ProductDetails = ({ product }) => {
  if (!product) {
    return (
      <div className="text-center mt-5">
        <h3>Product not found.</h3>
        <Link href="/products" className="btn btn-dark mt-3">Back to Products</Link>
      </div>
    );
  }

  const carouselId = "carousel-detail-" + product._id;
  const productImages = product.images && product.images.length > 0
    ? product.images
    : ["https://placehold.co/400x300?text=No+Image"];

  return (
    <div>
      <Link href="/products" className="btn btn-outline-dark btn-sm mb-3">
        ← Back to Products
      </Link>

      <div className="row">
        {/* Carousel */}
        <div className="col-md-5">
          <div id={carouselId} className="carousel slide border" data-bs-ride="carousel">
            <div className="carousel-inner">
              {productImages.map((img, index) => (
                <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                  <img
                    src={img}
                    className="d-block w-100"
                    alt={product.title}
                    style={{ height: "300px", objectFit: "contain", background: "#f8f9fa" }}
                  />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button"
              data-bs-target={"#" + carouselId} data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button"
              data-bs-target={"#" + carouselId} data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <h2>{product.title}</h2>
          {product.description && <p className="text-muted">{product.description}</p>}
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
          {product.stock !== undefined && <p><strong>Stock:</strong> {product.stock} units</p>}
          {product.rating > 0 && <p><strong>Rating:</strong> ⭐ {product.rating} / 5</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

// ✅ This fetches all product IDs from YOUR backend (not DummyJSON)
export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const products = await res.json();

    const paths = products.map((p) => ({
      params: { id: String(p._id) },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("getStaticPaths error:", error);
    return { paths: [], fallback: "blocking" };
  }
}

// ✅ This fetches ONE product by its MongoDB _id
export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
    const product = await res.json();

    if (!product || product.message === "Product not found") {
      return { notFound: true };
    }

    return {
      props: { product },
      revalidate: 30,
    };
  } catch (error) {
    return { notFound: true };
  }
}