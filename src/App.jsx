import { useEffect, useState } from "react";
import { Loading, ErrorMessage } from "./components/Status";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import CartPage from "./components/CartPage.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");
  const [lastOrder, setLastOrder] = useState(null);

  // B6 Option 1: Category filter state
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Fetch vendor data from vendors.json
  useEffect(() => {
    const controller = new AbortController();

    async function fetchVendors() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/vendors.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Vendor data must be an array.");
        }

        setVendors(data);

        setSelectedVendorId((currentId) => {
          if (data.some((vendor) => vendor.id === currentId)) {
            return currentId;
          }

          return data[0]?.id ?? null;
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load vendors.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchVendors();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  // Find the selected vendor
  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId,
  );

  // B6: Get the categories from the selected vendor's menu
  const categories = selectedVendor
    ? [...new Set(selectedVendor.menu.map((item) => item.category))]
    : [];

  // B6: Filter the menu by the selected category
  const filteredMenuItems = selectedVendor
    ? selectedVendor.menu.filter(
        (item) => categoryFilter === "All" || item.category === categoryFilter,
      )
    : [];

  // B6: Select a vendor and reset the category filter
  function handleSelectVendor(vendorId) {
    setSelectedVendorId(vendorId);
    setCategoryFilter("All");
  }

  // Add item to cart; increase quantity if already added
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.item.id === item.id,
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem,
        );
      }

      return [...prevCart, { item, qty: 1 }];
    });
  }

  // Increase or decrease quantity
  function handleUpdateQuantity(itemId, change) {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, qty: cartItem.qty + change }
            : cartItem,
        )
        .filter((cartItem) => cartItem.qty > 0),
    );
  }

  // Remove item from cart
  function handleRemoveFromCart(itemId) {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item.id !== itemId),
    );
  }

  // Calculate total number of items in the cart
  const cartCount = cart.reduce((total, cartItem) => total + cartItem.qty, 0);

  // Place order after checkout form validation
  function handlePlaceOrder(values) {
    const total = cart.reduce(
      (sum, cartItem) => sum + cartItem.item.price * cartItem.qty,
      0,
    );

    setLastOrder({
      ...values,
      total,
    });

    setCart([]);
    setView("done");
  }

  // Loading screen
  if (loading) {
    return <Loading />;
  }

  // Error screen
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    );
  }

  // No vendors found
  if (vendors.length === 0) {
    return (
      <main className="container">
        <p>No vendors found.</p>
        <button onClick={() => setReloadKey((key) => key + 1)}>
          Reload Vendors
        </button>
      </main>
    );
  }

  // Main interface
  return (
    <>
      <Header cartCount={cartCount} currentView={view} onNavigate={setView} />

      <main className="container">
        {view === "menu" && (
          <>
            <section>
              <h2 className="section-title">Choose a vendor</h2>

              <div className="vendor-grid">
                {vendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    isSelected={vendor.id === selectedVendorId}
                    onSelect={handleSelectVendor}
                  />
                ))}
              </div>
            </section>

            {selectedVendor && (
              <section>
                <h2 className="section-title">Menu: {selectedVendor.name}</h2>

                {/* B6: Category filter dropdown */}
                <div className="category-filter">
                  <label htmlFor="category-filter">Filter by category:</label>

                  <select
                    id="category-filter"
                    value={categoryFilter}
                    onChange={(event) => setCategoryFilter(event.target.value)}
                  >
                    <option value="All">All Categories</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display only the filtered menu items */}
                <MenuList items={filteredMenuItems} onAdd={handleAddToCart} />
              </section>
            )}
          </>
        )}

        {view === "cart" && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {view === "done" && lastOrder && (
          <section>
            <h2 className="section-title">Order Confirmed!</h2>

            <p>Thank you, {lastOrder.name}!</p>
            <p>Mahallah: {lastOrder.mahallah}</p>
            <p>Pickup Time: {lastOrder.pickupTime}</p>
            <p>Total: RM {lastOrder.total.toFixed(2)}</p>

            <button onClick={() => setView("menu")}>Back to Menu</button>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
