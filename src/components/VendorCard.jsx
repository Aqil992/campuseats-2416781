import { Link } from "react-router-dom";

function VendorCard({ vendor }) {
  return (
    <article className="card vendor-card">
      <div className="thumb" aria-hidden="true">
        {vendor.name.charAt(0)}
      </div>

      <div>
        <h2>{vendor.name}</h2>

        <p className="muted">{vendor.location}</p>

        <p className="muted">Open: {vendor.openHours}</p>

        <span className={vendor.isOpen ? "status open" : "status closed"}>
          {vendor.isOpen ? "Open now" : "Closed"}
        </span>

        <p>
          <Link to={`/vendor/${vendor.id}`} className="btn">
            View Menu
          </Link>
        </p>
      </div>
    </article>
  );
}

export default VendorCard;
