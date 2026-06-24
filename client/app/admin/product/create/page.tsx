export default function CreateProduct() {
  const sizes = ["S", "M", "L", "XL", "2XL"];

  return (
    <main>
      <section className="py-4">
        <div className="container">
          <header className="mb-4">
            <h1>Create Product</h1>
            <p>Add a new product to your store.</p>
          </header>

          <form>
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
                    ></textarea>
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
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select id="category" className="form-select">
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
                            value={size}
                            id={size}
                          />
                          <label className="form-check-label" htmlFor={size}>
                            {size}
                          </label>
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

                  <input type="file" className="form-control" multiple />

                  <small className="text-muted mt-2 d-block">
                    Upload one or more product images.
                  </small>
                </div>
                <div className="card p-4">
                  <h3 className="mb-3">Publish</h3>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>

                    <select id="status" className="form-select">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Create Product
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
