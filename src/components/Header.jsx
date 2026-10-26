function Header({ cartCount, currentView, onNavigate }) {
  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>

      <nav className="nav">
        <button
          type="button"
          onClick={() => onNavigate("menu")}
          className={`nav-button ${currentView === "menu" ? "active" : ""}`}
        >
          Vendors
        </button>

        <button
          type="button"
          onClick={() => onNavigate("cart")}
          className={`nav-button cart ${
            currentView === "cart" ? "active" : ""
          }`}
        >
          Cart <span className="badge">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
