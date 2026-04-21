import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, editData, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");

  // if editData is passed, fill the form
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setPrice(editData.price || "");
      setBrand(editData.brand || "");
      setCategory(editData.category || "");
      setImages(editData.images ? editData.images.join(", ") : "");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      title: title,
      description: description,
      price: Number(price),
      brand: brand,
      category: category,
      images: images.split(",").map((img) => img.trim()).filter((img) => img !== ""),
    };
    onSubmit(productData);
    // reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setBrand("");
    setCategory("");
    setImages("");
  };

  return (
    <div class="border rounded p-3 mb-4 bg-light">
      <h5>{editData ? "Edit Product" : "Add New Product"}</h5>
      <form onSubmit={handleSubmit}>
        <div class="mb-2">
          <label class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div class="mb-2">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>
        <div class="row">
          <div class="col mb-2">
            <label class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div class="col mb-2">
            <label class="form-label">Brand</label>
            <input
              type="text"
              class="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Category</label>
          <input
            type="text"
            class="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Images (comma separated URLs)</label>
          <input
            type="text"
            class="form-control"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="https://..., https://..."
          />
        </div>
        <button type="submit" class="btn btn-dark me-2">
          {editData ? "Save Changes" : "Add Product"}
        </button>
        <button type="button" class="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
