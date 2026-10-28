import { NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";

function Header() {
  const { count: cartCount } = useCart();

  return (
    <header className="header">
      <h1 className="logo">
        <NavLink to="/" className="logo-link">
          CampusEats
        </NavLink>
      </h1>

      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
        >
          Vendors
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
        >
          Orders
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `nav-button cart ${isActive ? "active" : ""}`
          }
        >
          Cart <span className="badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
