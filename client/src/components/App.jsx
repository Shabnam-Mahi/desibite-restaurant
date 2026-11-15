
import { useEffect, useState } from "react";

import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Menu from "./Menu.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import AIChat from "./AIChat.jsx";

import fallbackMenu from "../data/fallbackMenu.js";
import { getFoods, createOrder } from "../api.js";

function App() {
  const [foods, setFoods] = useState(fallbackMenu);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [order, setOrder] = useState(null);

  // Load food menu
  useEffect(() => {
    getFoods()
      .then((data) => {
        setFoods(data.foods);
      })
      .catch((error) => {
        console.warn("Using local fallback menu.", error);
      });
  }, []);

  // Add food to cart
  function addToCart(food) {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...food, quantity: 1 }];
    });

    setNotice(`${food.name} added to cart`);
    setTimeout(() => setNotice(""), 2200);
  }

  // Update quantity
  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Remove from cart
  function removeFromCart(id) {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  // Place order
  async function placeOrder(orderData) {
    try {
      const result = await createOrder(orderData);

      setOrder(result.order);
      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
    } catch (error) {
      console.error("Order failed:", error);
      setNotice("Order could not be placed. Please try again.");
      setTimeout(() => setNotice(""), 3000);
    }
  }

  // Calculate cart count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        <Hero />

        <Menu
          foods={foods}
          category={category}
          setCategory={setCategory}
          cuisine={cuisine}
          setCuisine={setCuisine}
          search={search}
          setSearch={setSearch}
          onAdd={addToCart}
        />

        <section className="about-section" id="about">
          <span className="eyebrow">OUR STORY</span>

          <h2>
            Real Desi Flavours.{" "}
            <span>Pure Vegetarian.</span>
          </h2>

          <p>
            DesiBite brings together the warmth of Punjabi cooking
            and the traditional flavours of Gujarati cuisine.
            Every dish is prepared with care and served with love.
          </p>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand">
          <span className="brand-icon">D</span>
          <span>
            Desi<span className="brand-highlight">Bite</span>
          </span>
        </a>

        <p>100% Vegetarian • Made with Love</p>

        <small>
          © {new Date().getFullYear()} DesiBite.
          Demo restaurant project.
        </small>
      </footer>

      {notice && (
        <div className="toast">{notice}</div>
      )}

      {cartOpen && (
        <Cart
          items={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && (
        <Checkout
          items={cart}
          onClose={() => setCheckoutOpen(false)}
          onPlaceOrder={placeOrder}
        />
      )}

      {order && (
        <div className="success-banner">
          <div>
            <strong>Order received! 🎉</strong>
            <p>Your demo order number is {order.id}</p>
          </div>

          <button onClick={() => setOrder(null)}>
            Close
          </button>
        </div>
      )}

      <AIChat />
    </>
  );
}

export default App;
