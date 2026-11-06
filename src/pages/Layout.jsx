import { Outlet, NavLink } from "react-router";
import { useCart } from "../hooks/useCart.js";
import Footer from "../components/Footer.jsx";

export function Layout() {
  const { count } = useCart();

  return (
    <>
      <header className="header">
        <h1 className="logo">CampusEats</h1>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Vendors
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Orders
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Cart <span className="badge">{count}</span>
          </NavLink>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
