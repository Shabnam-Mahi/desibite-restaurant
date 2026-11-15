import { useState } from "react";

function Checkout({ items, onClose, onPlaceOrder }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fulfillment, setFulfillment] = useState("Pickup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Demo estimate only. Set the actual tax rate for your location.
  const taxRate = 0.13;
  const tax = subtotal * taxRate;
  const deliveryFee = fulfillment === "Delivery" ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    if (fulfillment === "Delivery" && !address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    setLoading(true);

    try {
      await onPlaceOrder({
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim()
        },
        fulfillment,
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity
        }))
      });
    } catch (err) {
      setError(err.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="checkout-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-heading">
          <div>
            <span className="eyebrow">ALMOST THERE</span>
            <h2>Checkout</h2>
          </div>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />

          <label>Phone number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            required
          />

          <label>Order type</label>
          <div className="fulfillment-options">
            {["Pickup", "Delivery"].map((option) => (
              <button
                type="button"
                key={option}
                className={
                  fulfillment === option ? "fulfillment active" : "fulfillment"
                }
                onClick={() => setFulfillment(option)}
              >
                {option === "Pickup" ? "🏪" : "🛵"} {option}
              </button>
            ))}
          </div>

          {fulfillment === "Delivery" && (
            <>
              <label>Delivery address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                rows="3"
              />
            </>
          )}

          <div className="checkout-totals">
            <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <div><span>Estimated tax (13%)</span><strong>${tax.toFixed(2)}</strong></div>
            <div><span>Delivery fee</span><strong>${deliveryFee.toFixed(2)}</strong></div>
            <div className="grand-total"><span>Total estimate</span><strong>${total.toFixed(2)}</strong></div>
          </div>

          <p className="demo-notice">
            Demo checkout only. This does not charge a payment method.
            Confirm the actual tax rate for your location.
          </p>

          {error && <p className="form-error">{error}</p>}

          <button
            className="primary-button full-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Placing order..." : "Place Demo Order"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Checkout;