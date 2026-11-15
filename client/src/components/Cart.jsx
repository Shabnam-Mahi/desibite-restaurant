function Cart({
  items,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout
}) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-heading">
          <div>
            <span className="eyebrow">YOUR ORDER</span>
            <h2>Shopping Cart</h2>
          </div>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add something delicious from our menu.</p>
            <button className="primary-button" onClick={onClose}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <strong>{item.name}</strong>
                    <span>${item.price.toFixed(2)}</span>

                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>

                      <button
                        className="remove-button"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <strong>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <p>Tax and delivery charges are calculated at checkout.</p>

              <button
                className="primary-button full-button"
                onClick={onCheckout}
              >
                Continue to Checkout →
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;