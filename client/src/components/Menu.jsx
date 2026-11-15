import FoodCard from "./FoodCard";
import CategoryFilter from "./CategoryFilter";

function Menu({
  foods,
  category,
  setCategory,
  cuisine,
  setCuisine,
  search,
  setSearch,
  onAdd
}) {
  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      category === "All" || food.category === category;

    const matchesCuisine =
      cuisine === "All" || food.cuisine === cuisine;

    const matchesSearch =
      `${food.name} ${food.description}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesCuisine && matchesSearch;
  });

  return (
    <section className="menu-section" id="menu">
      <div className="section-heading">
        <div>
          <span className="eyebrow">OUR DELICIOUS COLLECTION</span>
          <h2>Explore Our <span>Menu</span></h2>
          <p>Authentic vegetarian food, prepared fresh every day.</p>
        </div>

        <div className="menu-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <CategoryFilter
        category={category}
        setCategory={setCategory}
        cuisine={cuisine}
        setCuisine={setCuisine}
      />

      {filteredFoods.length > 0 ? (
        <div className="food-grid">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAdd={onAdd}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🍽️</span>
          <h3>No dishes found</h3>
          <p>Try a different search or category.</p>
        </div>
      )}
    </section>
  );
}

export default Menu;