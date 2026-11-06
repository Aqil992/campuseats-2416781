import { useParams, useSearchParams } from "react-router";
import { useVendors } from "../hooks/useVendors.js";
import { useCart } from "../hooks/useCart.js";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";

export function VendorPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("cat") || "All";

  const { vendors, loading, error, reload } = useVendors();
  const { addToCart } = useCart();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);
  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
      </div>
    );
  }

  const categories = [
    "All",
    ...new Set(vendor.menu.map((item) => item.category)),
  ];
  const filteredMenu =
    selectedCategory === "All"
      ? vendor.menu
      : vendor.menu.filter((item) => item.category === selectedCategory);

  function handleCategoryChange(cat) {
    if (cat === "All") {
      searchParams.delete("cat");
    } else {
      searchParams.set("cat", cat);
    }
    setSearchParams(searchParams);
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <div
        className="category-filters"
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <MenuList items={filteredMenu} onAdd={addToCart} />
    </section>
  );
}
