import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const API = "http://localhost:5000/api/products";

// ✅ Now receives addToCart from _app.js via pageProps
const ProductsComponent = ({ initialProducts = [], addToCart }) => {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  // ✅ Use the addToCart from _app.js, then show toast
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`✅ "${product.title}" added to cart!`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p._id !== id));
      showToast("🗑️ Product deleted.");
    } catch {
      alert("Delete failed. Is the backend running?");
    }
  };

  const handleEdit = (product) => {
    setEditData(product);
    setShowForm(true);
  };

  const handleSubmit = async (productData) => {
    setLoading(true);
    try {
      if (editData) {
        const res = await fetch(`${API}/${editData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        const updated = await res.json();
        setProducts(products.map((p) => (p._id === updated._id ? updated : p)));
        showToast("✏️ Product updated!");
      } else {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        const created = await res.json();
        setProducts([...products, created]);
        showToast("🎉 Product added!");
      }
      setShowForm(false);
      setEditData(null);
    } catch {
      alert("Save failed. Is the backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="container">

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "24px", right: "24px",
          background: "#212529", color: "#fff",
          padding: "12px 20px", borderRadius: "8px",
          zIndex: 9999, fontSize: "14px", fontWeight: "500",
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Products ({products.length})</h2>
        <button
          className="btn btn-dark"
          onClick={() => { setEditData(null); setShowForm(!showForm); }}
        >
          {showForm ? "✕ Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <ProductForm
          onSubmit={handleSubmit}
          editData={editData}
          onCancel={() => { setShowForm(false); setEditData(null); }}
        />
      )}

      {loading && <div className="alert alert-info py-2">Saving...</div>}

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-muted text-center py-5">No products yet. Click "+ Add Product"!</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-3 mb-3" key={p._id}>
              <ProductCard
                product={p}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductsComponent;