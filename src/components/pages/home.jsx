
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOpportunities } from "../../services/opportunityService";
import "./home.css";

const categories = [
  {
    icon: "💼",
    title: "Internships",
    type: "Internship",
    description: "Gain real-world experience and kickstart your career.",
  },
  {
    icon: "💻",
    title: "Hackathons",
    type: "Hackathon",
    description: "Build projects, solve problems, and win prizes.",
  },
  {
    icon: "🎓",
    title: "Scholarships",
    type: "Scholarship",
    description: "Find financial support for your education.",
  },
  {
    icon: "🏆",
    title: "Competitions",
    type: "Competition",
    description: "Showcase your skills and stand out.",
  },
];

function Home() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    let active = true;
    fetchOpportunities()
      .then((data) => {
        if (active) setOpportunities(data.slice(0, 3));
      })
      .catch(() => {
        if (active) setOpportunities([]);
      });

    return () => { active = false; };
  }, []);

  return (
    <main className="home">

      {/* 1. Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            Your Gateway to Opportunities
          </span>

          <h1>
            Discover Opportunities.
            <br />
            Build Your <span>Tomorrow.</span>
          </h1>

          <p>
            Find internships, hackathons, scholarships and
            competitions in one place. Learn new skills and
            take the next step in your career.
          </p>

          <form
            className="hero-search"
            onSubmit={(event) => {
              event.preventDefault();
              const query = event.currentTarget.elements.search.value;
              window.location.href =
                `/opportunities?search=${encodeURIComponent(query)}`;
            }}
          >
            <input
              name="search"
              type="search"
              placeholder="Search opportunities, skills or organizations..."
              aria-label="Search opportunities"
            />

            <button type="submit">Search</button>
          </form>

          <a className="hero-link" href="/opportunities">
            Explore all opportunities →
          </a>
        </div>

        <div className="hero-visual">
          <div className="visual-circle">🚀</div>
          <div className="floating-tag tag-one">💼 Internships</div>
          <div className="floating-tag tag-two">💻 Hackathons</div>
          <div className="floating-tag tag-three">🎓 Scholarships</div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="categories section">
        <div className="section-heading">
          <div>
            <h2>Explore Opportunities</h2>
            <p>Find the right path for your goals.</p>
          </div>

          <Link to="/opportunities">View all →</Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              className="category-card"
              to={`/opportunities?category=${encodeURIComponent(category.type)}`}
              key={category.title}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="card-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Opportunities */}
      <section className="featured section">
        <div className="section-heading">
          <div>
            <h2>Featured Opportunities</h2>
            <p>Discover opportunities worth exploring.</p>
          </div>

          <Link to="/opportunities">View all →</Link>
        </div>

        <div className="opportunity-grid">
          {opportunities.map((item) => (
            <article className="opportunity-card" key={item._id ?? item.id}>
              <span className="opportunity-type">{item.type}</span>

              <h3>{item.title}</h3>
              <p className="organization">{item.organization}</p>

              <div className="opportunity-details">
                <p>📍 {item.location}</p>
                <p>📅 Deadline: {item.deadline ? new Date(item.deadline).toLocaleDateString("en-IN") : "Not specified"}</p>
              </div>

              <Link
                className="details-button"
                to={`/opportunities/${item._id ?? item.id}`}
              >
                View Details →
              </Link>
            </article>
          ))}
          {!opportunities.length && <p>No opportunities are available right now.</p>}
        </div>
      </section>

      {/* 4. Platform Stats */}
      <section className="stats">
        <div>
          <h2>One Platform</h2>
          <p>Multiple opportunities to grow.</p>
        </div>

        <div>
          <strong>Learn</strong>
          <p>Build new skills.</p>
        </div>

        <div>
          <strong>Explore</strong>
          <p>Discover possibilities.</p>
        </div>

        <div>
          <strong>Achieve</strong>
          <p>Move toward your goals.</p>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="cta">
        <div>
          <h2>Your next opportunity starts here.</h2>
          <p>Stop missing opportunities. Start discovering them.</p>
        </div>

        <a href="/signup" className="cta-button">
          Get Started →
        </a>
      </section>

    </main>
  );
}

export default Home;
