import { Link } from "react-router-dom";
import "./OpportunityDetails.css";

function OpportunityDetails() {
  // Temporary sample data — later this will come from your backend.
  const opportunity = {
    title: "Software Engineering Intern",
    organization: "TechNova",
    type: "Internship",
    mode: "Remote",
    location: "India",
    duration: "3 Months",
    stipend: "₹15,000 / month",
    deadline: "15 November 2026",
    posted: "Recently posted",
    eligibility: [
      "Students pursuing a Bachelor's degree in CS, IT, or a related field",
      "Basic knowledge of programming and data structures",
      "Willingness to learn and work in a team",
    ],
    skills: ["JavaScript", "React", "Git", "Problem Solving"],
    description:
      "Join our engineering team to work on real-world software products. You will collaborate with developers, learn industry practices, and contribute to features used by actual users.",
    responsibilities: [
      "Develop and improve application features.",
      "Collaborate with the engineering team.",
      "Write readable, maintainable code.",
      "Learn and apply software development best practices.",
    ],
    benefits: [
      "Monthly stipend",
      "Mentorship from developers",
      "Practical project experience",
      "Certificate on successful completion",
    ],
    applyUrl: "https://example.com",
  };

  return (
    <main className="opportunity-details">
      <div className="details-container">
        <Link to="/opportunities" className="back-link">
          ← Back to opportunities
        </Link>

        {/* Opportunity heading */}
        <section className="details-hero">
          <div className="company-logo">T</div>

          <div className="details-heading">
            <span className="opportunity-type">{opportunity.type}</span>
            <h1>{opportunity.title}</h1>
            <p className="organization-name">{opportunity.organization}</p>

            <div className="opportunity-meta">
              <span>📍 {opportunity.mode}</span>
              <span>🌐 {opportunity.location}</span>
              <span>🕒 {opportunity.duration}</span>
            </div>
          </div>

          <div className="apply-box">
            <p className="stipend-label">Compensation</p>
            <h2>{opportunity.stipend}</h2>
            <p className="deadline">
              Deadline: <strong>{opportunity.deadline}</strong>
            </p>

            <a
              href={opportunity.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="apply-button"
            >
              Apply Now ↗
            </a>

            <p className="external-note">
              You will be redirected to the application website.
            </p>
          </div>
        </section>

        {/* Main content and sidebar */}
        <div className="details-layout">
          <div className="details-main">
            <section className="details-card">
              <h2>About this opportunity</h2>
              <p>{opportunity.description}</p>
            </section>

            <section className="details-card">
              <h2>What you'll do</h2>
              <ul>
                {opportunity.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="details-card">
              <h2>Eligibility criteria</h2>
              <ul>
                {opportunity.eligibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="details-card">
              <h2>What you'll gain</h2>
              <ul>
                {opportunity.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="details-sidebar">
            <section className="details-card">
              <h2>Opportunity overview</h2>

              <div className="overview-item">
                <span>Opportunity type</span>
                <strong>{opportunity.type}</strong>
              </div>

              <div className="overview-item">
                <span>Work mode</span>
                <strong>{opportunity.mode}</strong>
              </div>

              <div className="overview-item">
                <span>Duration</span>
                <strong>{opportunity.duration}</strong>
              </div>

              <div className="overview-item">
                <span>Application deadline</span>
                <strong>{opportunity.deadline}</strong>
              </div>

              <div className="overview-item">
                <span>Posted</span>
                <strong>{opportunity.posted}</strong>
              </div>
            </section>

            <section className="details-card">
              <h2>Skills you'll use</h2>
              <div className="skills-list">
                {opportunity.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <div className="sidebar-note">
              <span>💡</span>
              <p>
                Check the eligibility criteria and deadline before applying.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OpportunityDetails;