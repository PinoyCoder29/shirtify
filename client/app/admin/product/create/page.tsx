"use client";

import { useState } from "react";
import { createProduct } from "@/services/product.service";
import { uploadImage } from "@/services/upload.service";

export default function CreateProduct() {
  const sizes = ["S", "M", "L", "XL", "2XL"];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [category, setCategory] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  function handleSizeChange(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    try {
      const uploadedImages: string[] = [];

      for (const file of Array.from(files)) {
        const result = await uploadImage(file);

        uploadedImages.push(result.url);
      }

      setImages(uploadedImages);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const variants = selectedSizes.map((size) => ({
        size,
        stock,
      }));

      const result = await createProduct({
        name,
        description,
        price,
        category,
        images,
        variants,
      });

      console.log(result);

      alert("Product created successfully!");

      setName("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setCategory("");
      setImages([]);
      setSelectedSizes([]);
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="py-4">
        <div className="container">
          <header className="mb-4">
            <h1>Create Product</h1>
            <p>Add a new product to your store.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* LEFT SIDE */}
              <div className="col-lg-8">
                {/* GENERAL INFORMATION */}
                <div className="card p-4 mb-4">
                  <h3 className="mb-3">General Information</h3>

                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Product Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>

                    <textarea
                      id="description"
                      className="form-control"
                      rows={6}
                      placeholder="Enter product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* PRODUCT DETAILS */}
                <div className="card p-4 mb-4">
                  <h3 className="mb-3">Product Details</h3>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>

                      <input
                        id="price"
                        type="number"
                        className="form-control"
                        placeholder="₱0.00"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="stock" className="form-label">
                        Stock Quantity
                      </label>

                      <input
                        id="stock"
                        type="number"
                        className="form-control"
                        placeholder="0"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>

                    <select
                      id="category"
                      className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="oversized">Oversized Shirt</option>
                      <option value="streetwear">Streetwear</option>
                      <option value="graphic">Graphic Tee</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Available Sizes</label>

                    <div className="d-flex gap-4 flex-wrap">
                      {sizes.map((size) => (
                        <div className="form-check" key={size}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeChange(size)}
                          />

                          <label className="form-check-label">{size}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-4">
                {/* PRODUCT IMAGES */}
                <div className="card p-4 mb-3">
                  <h3 className="mb-3">Product Images</h3>

                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={handleImageChange}
                  />

                  <small className="text-muted mt-2 d-block">
                    Upload one or more product images.
                  </small>

                  {images.length > 0 && (
                    <div className="mt-3">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Preview"
                          width={80}
                          className="me-2 mb-2"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* PUBLISH */}
                <div className="card p-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
