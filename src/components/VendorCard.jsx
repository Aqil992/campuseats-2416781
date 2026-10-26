function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`card vendor-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(vendor.id)}
      aria-pressed={isSelected}
    >
      <div className="thumb" aria-hidden="true">
        {vendor.name.charAt(0)}
      </div>

      <div className="vendor-info">
        <h3>{vendor.name}</h3>

        <p className="muted">{vendor.location}</p>

        <p className="muted">Open: {vendor.openHours}</p>

        <span className={vendor.isOpen ? "status open" : "status closed"}>
          {vendor.isOpen ? "Open now" : "Closed"}
        </span>

        {isSelected && <p className="vendor-selected-label">✓ Selected</p>}
      </div>
    </button>
  );
}

export default VendorCard;
