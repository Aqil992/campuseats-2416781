import VendorCard from "../components/VendorCard.jsx";

function HomePage({ vendors }) {
  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>

      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
