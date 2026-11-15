function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="eyebrow">100% VEGETARIAN • FRESHLY PREPARED</span>

        <h1>
          Taste the Love
          <br />
          of <span>Desi Food.</span>
        </h1>

        <p>
          From Punjabi favourites to Gujarati classics,
          enjoy authentic vegetarian flavours made fresh for you.
        </p>

        <div className="hero-actions">
          <a href="#menu" className="primary-button">
            Explore Menu →
          </a>
          <span className="hero-note">Fresh • Authentic • Vegetarian</span>
        </div>

        <div className="hero-stats">
          <div>
            <strong>100%</strong>
            <span>Vegetarian</span>
          </div>
          <div>
            <strong>Fresh</strong>
            <span>Every Day</span>
          </div>
          <div>
            <strong>Desi</strong>
            <span>Made with Love</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000"
          alt="Indian vegetarian food platter"
        />
        <div className="hero-image-tag">
          <span>🌿</span>
          <div>
            <strong>Pure Vegetarian</strong>
            <small>Always fresh, always delicious</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;