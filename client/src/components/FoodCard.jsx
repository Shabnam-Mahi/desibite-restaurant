function FoodCard({ food, onAdd }) {
  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img src={food.image} alt={food.name} loading="lazy" />

        {food.popular && (
          <span className="popular-tag">★ Popular</span>
        )}

        <span className="veg-tag">🟢 Vegetarian</span>
      </div>

      <div className="food-info">
        <div className="food-meta">
          <span>{food.cuisine}</span>
          <span>{food.category}</span>
        </div>

        <h3>{food.name}</h3>
        <p>{food.description}</p>

        <div className="food-bottom">
          <strong>${food.price.toFixed(2)}</strong>
          <button onClick={() => onAdd(food)}>
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;