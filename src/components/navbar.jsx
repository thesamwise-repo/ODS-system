
import { useState } from "react";
import "./navbar.css";

const opportunityLinks = [
  { label: "Internships", href: "/opportunities?category=Internship" },
  { label: "Hackathons", href: "/opportunities?category=Hackathon" },
  { label: "Scholarships", href: "/opportunities?category=Scholarship" },
  { label: "Competitions", href: "/opportunities?category=Competition" },
  { label: "Workshops & Bootcamps", href: "/opportunities?category=Workshop" },
];

function BrandIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="brand-icon"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 13 20 5l17 8-17 8L3 13Z"
        fill="currentColor"
      />
      <path
        d="M9 17v9c6 6 16 6 22 0v-9l-11 5-11-5Z"
        fill="currentColor"
        opacity=".72"
      />
      <path
        d="M36 14v10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={open ? "chevron-icon is-open" : "chevron-icon"}
      aria-hidden="true"
    >
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentPath = window.location.pathname;

  const isActive = (href) => currentPath === href;

  function closeMenus() {
    setMobileOpen(false);
    setDropdownOpen(false);
  }

  function handleSearch(event) {
    event.preventDefault();

    const query = searchTerm.trim();
    if (!query) return;

    window.location.href =
      `/opportunities?search=${encodeURIComponent(query)}`;
  }

  return (
    <header className="ods-header">
      <div className="ods-navbar">
        {/* 1. Brand */}
        <a
          href="/"
          className="ods-brand"
          aria-label="ODS home"
          onClick={closeMenus}
        >
          <span className="ods-brand-mark">
            <BrandIcon />
          </span>

          <span className="ods-brand-copy">
            <span className="ods-brand-name">OpportuNext</span>
            <span className="ods-brand-tagline">
              Discover. Learn. Grow.
            </span>
          </span>
        </a>

        {/* 2. Desktop navigation */}
        <nav className="ods-desktop-nav" aria-label="Main navigation">
          <a
            href="/"
            className={`ods-nav-link ${isActive("/") ? "active" : ""}`}
            aria-current={isActive("/") ? "page" : undefined}
          >
            Home
          </a>

          <div className="ods-dropdown">
            <button
              type="button"
              className={`ods-nav-link ods-dropdown-trigger ${
                currentPath.startsWith("/opportunities") ? "active" : ""
              }`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              Opportunities
              <ChevronIcon open={dropdownOpen} />
            </button>

            {dropdownOpen && (
              <div className="ods-dropdown-panel">
                <div className="ods-dropdown-heading">
                  <span className="ods-dropdown-eyebrow">
                    EXPLORE ODS
                  </span>
                  <p>Find your next big opportunity.</p>
                </div>

                {opportunityLinks.map((item) => (
                  <a
                    href={item.href}
                    key={item.href}
                    className="ods-dropdown-link"
                    onClick={closeMenus}
                  >
                    <span>{item.label}</span>
                    <span className="ods-dropdown-arrow">↗</span>
                  </a>
                ))}

                <a
                  href="/opportunities"
                  className="ods-dropdown-all"
                  onClick={closeMenus}
                >
                  View all opportunities →
                </a>
              </div>
            )}
          </div>

          <a
            href="/about"
            className={`ods-nav-link ${isActive("/about") ? "active" : ""}`}
            aria-current={isActive("/about") ? "page" : undefined}
          >
            About
          </a>
        </nav>

        {/* 3. Desktop actions */}
        <div className="ods-actions">
          <button
            type="button"
            className={`ods-icon-button ${searchOpen ? "selected" : ""}`}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <SearchIcon />
          </button>

          <a href="/login" className="ods-login-button">
            Login
          </a>

          <a href="/signup" className="ods-signup-button">
            Sign Up <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* 4. Mobile menu toggle */}
        <button
          type="button"
          className="ods-mobile-toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="ods-mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      {/* 5. Expandable search */}
      {searchOpen && (
        <form className="ods-search-panel" onSubmit={handleSearch}>
          <SearchIcon />
          <input
            type="search"
            placeholder="Search internships, hackathons, skills..."
            aria-label="Search opportunities"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoFocus
          />
          <button type="submit" className="ods-search-submit">
            Search
          </button>
        </form>
      )}

      {/* 6. Mobile navigation */}
      {mobileOpen && (
        <nav
          className="ods-mobile-menu"
          id="ods-mobile-menu"
          aria-label="Mobile navigation"
        >
          <a href="/" onClick={closeMenus}>Home</a>

          <button
            type="button"
            className="ods-mobile-dropdown-trigger"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((open) => !open)}
          >
            Opportunities
            <ChevronIcon open={dropdownOpen} />
          </button>

          {dropdownOpen && (
            <div className="ods-mobile-submenu">
              {opportunityLinks.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={closeMenus}
                >
                  {item.label}
                </a>
              ))}
              <a href="/opportunities" onClick={closeMenus}>
                View all opportunities →
              </a>
            </div>
          )}

          <a href="/about" onClick={closeMenus}>About</a>
          <a href="/login" onClick={closeMenus}>Login</a>
          <a
            href="/signup"
            className="ods-mobile-signup"
            onClick={closeMenus}
          >
            Create your account →
          </a>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
