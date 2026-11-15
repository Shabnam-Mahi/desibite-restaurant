function CategoryFilter({
  category,
  setCategory,
  cuisine,
  setCuisine
}) {
  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
  const cuisines = ["All", "Punjabi", "Gujarati", "Indian"];

  return (
    <div className="filters">
      <div className="filter-group">
        <span className="filter-label">MEAL</span>
        <div className="filter-options">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "filter active" : "filter"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">CUISINE</span>
        <div className="filter-options">
          {cuisines.map((item) => (
            <button
              key={item}
              className={cuisine === item ? "filter active" : "filter"}
              onClick={() => setCuisine(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;