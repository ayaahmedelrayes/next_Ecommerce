import React from "react";
import Link from "next/link";

const ProductCard = ({ product, onDelete, onEdit, onAddToCart }) => {
  const carouselId = "carousel-" + product._id;
  const productImages = product.images && product.images.length > 0
    ? product.images
    : ["https://placehold.co/400x300?text=No+Image"];

  return (
    <div className="card h-100">
      <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {productImages.map((img, index) => (
            <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
              <img src={img} className="d-block w-100" alt={product.title}
                style={{ height: "200px", objectFit: "contain", background: "#f8f9fa" }} />
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

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
        <p className="card-text"><strong>Category:</strong> {product.category}</p>
        {product.brand && (
          <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
        )}
        {product.stock !== undefined && (
          <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
        )}

        <div className="mt-auto d-flex gap-2 flex-wrap">
          <Link href={"/products/" + product._id} className="btn btn-dark btn-sm">
            See More
          </Link>
          <button className="btn btn-secondary btn-sm" onClick={() => onEdit(product)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(product._id)}>
            Delete
          </button>
          <button className="btn btn-success btn-sm" onClick={() => onAddToCart(product)}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;