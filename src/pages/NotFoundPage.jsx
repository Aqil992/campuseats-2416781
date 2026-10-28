import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2 className="section-title">404 - Page Not Found</h2>

      <p>Sorry, the page you are looking for does not exist.</p>

      <Link to="/">Back to Home</Link>
    </section>
  );
}

export default NotFoundPage;
