import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOpportunity } from "../../services/opportunityService";
import "./OpportunityDetails.css";

function displayDate(value) {
  if (!value) return "Not specified";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Not specified" : date.toLocaleDateString("en-IN");
}

function OpportunityDetails() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadOpportunity() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchOpportunity(id);
        if (active) setOpportunity(data);
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load this opportunity.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadOpportunity();
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return <main className="opportunity-details"><div className="details-container"><p>Loading opportunity...</p></div></main>;
  }

  if (error || !opportunity) {
    return (
      <main className="opportunity-details">
        <div className="details-container">
          <Link to="/opportunities" className="back-link">← Back to opportunities</Link>
          <p role="alert">{error || "Opportunity not found."}</p>
        </div>
      </main>
    );
  }

  const skills = Array.isArray(opportunity.skills) ? opportunity.skills : [];
  const applyUrl = (() => {
    try {
      const url = new URL(opportunity.applyUrl);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  })();
  const stipend = Number(opportunity.stipend);

  return (
    <main className="opportunity-details">
      <div className="details-container">
        <Link to="/opportunities" className="back-link">← Back to opportunities</Link>

        <section className="details-hero">
          <div className="company-logo" aria-hidden="true">{opportunity.organization?.charAt(0) || "?"}</div>
          <div className="details-heading">
            <span className="opportunity-type">{opportunity.type}</span>
            <h1>{opportunity.title}</h1>
            <p className="organization-name">{opportunity.organization}</p>
            <div className="opportunity-meta">
              <span>📍 {opportunity.mode || "Mode not specified"}</span>
              <span>🌐 {opportunity.location || "Location not specified"}</span>
              {opportunity.duration && <span>🕒 {opportunity.duration}</span>}
            </div>
          </div>

          <div className="apply-box">
            <p className="stipend-label">Compensation</p>
            <h2>{Number.isFinite(stipend) && stipend > 0 ? `₹${stipend.toLocaleString("en-IN")}` : "Not specified"}</h2>
            <p className="deadline">Deadline: <strong>{displayDate(opportunity.deadline)}</strong></p>
            {applyUrl ? (
              <a href={applyUrl} target="_blank" rel="noreferrer" className="apply-button">Apply Now ↗</a>
            ) : (
              <p className="external-note">An application link has not been provided.</p>
            )}
            {applyUrl && <p className="external-note">You will be redirected to the application website.</p>}
          </div>
        </section>

        <div className="details-layout">
          <div className="details-main">
            <section className="details-card">
              <h2>About this opportunity</h2>
              <p>{opportunity.description || "No description has been provided."}</p>
            </section>
            <section className="details-card">
              <h2>Eligibility criteria</h2>
              <p>{opportunity.eligibility || "Eligibility details have not been provided."}</p>
            </section>
          </div>

          <aside className="details-sidebar">
            <section className="details-card">
              <h2>Opportunity overview</h2>
              <div className="overview-item"><span>Opportunity type</span><strong>{opportunity.type}</strong></div>
              <div className="overview-item"><span>Work mode</span><strong>{opportunity.mode || "Not specified"}</strong></div>
              <div className="overview-item"><span>Duration</span><strong>{opportunity.duration || "Not specified"}</strong></div>
              <div className="overview-item"><span>Application deadline</span><strong>{displayDate(opportunity.deadline)}</strong></div>
              <div className="overview-item"><span>Posted</span><strong>{displayDate(opportunity.createdAt)}</strong></div>
            </section>

            {skills.length > 0 && (
              <section className="details-card">
                <h2>Skills you'll use</h2>
                <div className="skills-list">
                  {skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}
                </div>
              </section>
            )}
            <div className="sidebar-note"><span>💡</span><p>Check the eligibility criteria and deadline before applying.</p></div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OpportunityDetails;