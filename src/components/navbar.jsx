import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      {/* Logo */}
      <a href="/" className="navbar-logo">
        <img src="/logo.png" alt="OpportuNext" />
        <span>OpportuNext</span>
      </a>

      {/* Navigation */}
      <nav className="navbar-links">
        <a href="/" className="active">Home</a>
        <a href="/opportunities">Opportunities</a>
        <a href="/about">About</a>
      </nav>

      {/* Actions */}
      <div className="navbar-actions">
        <button className="search-btn">
          🔍
        </button>

        <a href="/login" className="login-btn">
          Login
        </a>

        <a href="/signup" className="signup-btn">
          Sign Up
        </a>
      </div>

    </header>
  );
}

export default Navbar;