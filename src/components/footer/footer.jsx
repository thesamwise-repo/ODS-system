
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* 1. Brand Section */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            Opportu<span>Next</span>
          </a>

          <p>
            Discover internships, hackathons, scholarships
            and competitions — all in one place.
          </p>

          <div className="footer-socials">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/opportunities">Explore Opportunities</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>

        {/* 3. Opportunity Categories */}
        <div className="footer-links">
          <h3>Categories</h3>
          <a href="/opportunities?category=internships">Internships</a>
          <a href="/opportunities?category=hackathons">Hackathons</a>
          <a href="/opportunities?category=scholarships">Scholarships</a>
          <a href="/opportunities?category=competitions">Competitions</a>
        </div>

        {/* 4. Account Links */}
        <div className="footer-links">
          <h3>Your Account</h3>
          <a href="/login">Login</a>
          <a href="/signup">Create Account</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

      </div>

      {/* 5. Copyright */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} OpportuNext.
          All rights reserved.
        </p>

        <p>Built to help students discover more.</p>
      </div>
    </footer>
  );
}

export default Footer;
