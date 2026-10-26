import { useState } from "react";

function CheckoutForm({ onPlaceOrder }) {
  const [name, setName] = useState("");
  const [mahallah, setMahallah] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!mahallah) {
      newErrors.mahallah = "Please select your Mahallah.";
    }

    if (!pickupTime) {
      newErrors.pickupTime = "Please select a pickup time.";
    } else if (pickupTime < "07:00" || pickupTime > "22:00") {
      newErrors.pickupTime = "Pickup time must be between 07:00 and 22:00.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onPlaceOrder({
        name: name.trim(),
        mahallah,
        pickupTime,
      });
    }
  }

  return (
    <section>
      <h2 className="section-title">Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer-name">Full Name</label>
          <input
            id="customer-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="mahallah">Mahallah</label>
          <select
            id="mahallah"
            value={mahallah}
            onChange={(event) => setMahallah(event.target.value)}
          >
            <option value="">Select your Mahallah</option>
            <option value="Ali">Ali</option>
            <option value="Aminah">Aminah</option>
            <option value="Faruq">Faruq</option>
            <option value="Asiah">Asiah</option>
            <option value="Bilal">Bilal</option>
            <option value="Hafsa">Hafsa</option>
            <option value="Uthman">Uthman</option>
            <option value="Zubair">Zubair</option>
          </select>
          {errors.mahallah && <p className="error">{errors.mahallah}</p>}
        </div>

        <div>
          <label htmlFor="pickup-time">Pickup Time</label>
          <input
            id="pickup-time"
            type="time"
            value={pickupTime}
            onChange={(event) => setPickupTime(event.target.value)}
          />
          {errors.pickupTime && <p className="error">{errors.pickupTime}</p>}
        </div>

        <button type="submit">Place Order</button>
      </form>
    </section>
  );
}

export default CheckoutForm;
