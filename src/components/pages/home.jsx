
import "./home.css";

const categories = [
  {
    icon: "💼",
    title: "Internships",
    description: "Gain real-world experience and kickstart your career.",
  },
  {
    icon: "💻",
    title: "Hackathons",
    description: "Build projects, solve problems, and win prizes.",
  },
  {
    icon: "🎓",
    title: "Scholarships",
    description: "Find financial support for your education.",
  },
  {
    icon: "🏆",
    title: "Competitions",
    description: "Showcase your skills and stand out.",
  },
];

const opportunities = [
  {
    type: "Internship",
    title: "Software Engineering Intern",
    organization: "Example Company",
    location: "Remote",
    deadline: "30 November",
  },
  {
    type: "Hackathon",
    title: "Build With AI",
    organization: "Tech Community",
    location: "Online",
    deadline: "5 December",
  },
  {
    type: "Scholarship",
    title: "Merit-Based Scholarship",
    organization: "Education Foundation",
    location: "India",
    deadline: "15 December",
  },
];

function Home() {
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

          <a href="/opportunities">View all →</a>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <a
              className="category-card"
              href={`/opportunities?category=${encodeURIComponent(category.title)}`}
              key={category.title}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="card-arrow">↗</span>
            </a>
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

          <a href="/opportunities">View all →</a>
        </div>

        <div className="opportunity-grid">
          {opportunities.map((item) => (
            <article className="opportunity-card" key={item.title}>
              <span className="opportunity-type">{item.type}</span>

              <h3>{item.title}</h3>
              <p className="organization">{item.organization}</p>

              <div className="opportunity-details">
                <p>📍 {item.location}</p>
                <p>📅 Deadline: {item.deadline}</p>
              </div>

              <a
                className="details-button"
                href="/opportunities"
              >
                View Details →
              </a>
            </article>
          ))}
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
