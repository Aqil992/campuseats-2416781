import { Routes, Route, useNavigate } from "react-router-dom";
import { useVendors } from "./hooks/useVendors.js";
import { useCart } from "./hooks/useCart.js";
import { Loading, ErrorMessage } from "./components/Status";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import VendorPage from "./pages/VendorPage.jsx";
import CartPage from "./components/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  const { vendors, loading, error, reload } = useVendors();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage vendors={vendors} />} />

        <Route path="vendor/:id" element={<VendorPage vendors={vendors} />} />

        <Route path="cart" element={<CartRoute />} />

        <Route path="orders" element={<OrdersPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function CartRoute() {
  const navigate = useNavigate();
  const { placeOrder } = useCart();

  function handlePlaceOrder(details) {
    placeOrder(details);
    navigate("/orders");
  }

  return <CartPage onPlaceOrder={handlePlaceOrder} />;
}

export default App;
