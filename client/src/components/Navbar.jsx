function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="navbar">
      <a href="#home" className="brand">
        <span className="brand-icon">D</span>
        <span>Desi<span className="brand-highlight">Bite</span></span>
      </a>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#menu">Our Menu</a>
        <a href="#about">About Us</a>
      </nav>

      <button className="cart-button" onClick={onCartClick}>
        <span>🛒</span>
        Cart
        <span className="cart-count">{cartCount}</span>
      </button>
    </header>
  );
}

export default Navbar;