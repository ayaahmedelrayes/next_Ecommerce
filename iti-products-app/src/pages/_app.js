import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
      <NavBar
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
      />

      {/* Cart Drawer Overlay */}
      {showCart && (
        <>
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 1040,
            }}
          />

          <div
            style={{
              position: "fixed", top: 0, right: 0,
              width: "380px", height: "100vh",
              background: "#fff", zIndex: 1050,
              display: "flex", flexDirection: "column",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div
              className="d-flex justify-content-between align-items-center p-3"
              style={{ borderBottom: "1px solid #eee" }}
            >
              <h5 className="mb-0">🛒 Cart ({cartCount} items)</h5>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowCart(false)}
              >
                ✕ Close
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {cart.length === 0 ? (
                <div className="text-center text-muted mt-5">
                  <p style={{ fontSize: "48px" }}>🛒</p>
                  <p>Your cart is empty.</p>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => setShowCart(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex align-items-center gap-3 mb-3 p-2"
                    style={{ border: "1px solid #eee", borderRadius: "8px" }}
                  >
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : "https://placehold.co/60x60?text=?"
                      }
                      alt={item.title}
                      style={{
                        width: "60px", height: "60px",
                        objectFit: "contain", background: "#f8f9fa",
                        borderRadius: "6px", flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="mb-0 fw-semibold"
                        style={{ fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title}
                      </p>
                      <p className="mb-0 text-muted" style={{ fontSize: "13px" }}>
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-end" style={{ flexShrink: 0 }}>
                      <p className="mb-1 fw-bold" style={{ fontSize: "14px" }}>
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        style={{ fontSize: "11px", padding: "2px 8px" }}
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ borderTop: "1px solid #eee", padding: "16px", background: "#fafafa" }}>
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold" style={{ fontSize: "18px" }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button className="btn btn-dark w-100 mb-2">Checkout</button>
                <button
                  className="btn btn-outline-secondary w-100 btn-sm"
                  onClick={() => setCart([])}
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <div className="container my-4" style={{ flex: 1 }}>
        <Component
          {...pageProps}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </div>
      <Footer />
    </>
  );
}