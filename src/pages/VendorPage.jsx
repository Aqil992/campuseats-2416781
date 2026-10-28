import { useParams, useSearchParams } from "react-router-dom";
import MenuList from "../components/MenuList.jsx";

function VendorPage({ vendors }) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const vendor = vendors.find((vendor) => String(vendor.id) === id);

  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p>The vendor you are looking for does not exist.</p>
      </section>
    );
  }

  const categories = [...new Set(vendor.menu.map((item) => item.category))];

  const requestedCategory = searchParams.get("cat");

  const categoryFilter = categories.includes(requestedCategory)
    ? requestedCategory
    : "All";

  const filteredMenuItems = vendor.menu.filter(
    (item) => categoryFilter === "All" || item.category === categoryFilter,
  );

  function handleCategoryChange(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ cat: category });
    }
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <div className="category-filter">
        <label htmlFor="category-filter">Filter by category:</label>

        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option value="All">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <MenuList items={filteredMenuItems} />
    </section>
  );
}

export default VendorPage;
