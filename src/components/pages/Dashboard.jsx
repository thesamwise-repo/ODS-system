import { useState } from "react";
import { Link } from "react-router-dom";
import { opportunities } from "./opportunitiesData";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("ods-demo-user") || "null")
  );
  const [savedIds, setSavedIds] = useState(() =>
    JSON.parse(localStorage.getItem("ods-saved") || "[]")
  );

  function removeSaved(id) {
    const updated = savedIds.filter((savedId) => savedId !== id);
    setSavedIds(updated);
    localStorage.setItem("ods-saved", JSON.stringify(updated));
  }

  function logout() {
    localStorage.removeItem("ods-demo-user");
    setUser(null);
  }

  const savedOpportunities = opportunities.filter((item) =>
    savedIds.includes(item.id)
  );

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">YOUR SPACE</span>
          <h1>Hello{user?.name ? `, ${user.name}` : " there"}!</h1>
          <p>Keep track of opportunities that matter to you.</p>
        </div>

        {user && (
          <button className="dashboard-logout" onClick={logout}>
            Log out
          </button>
        )}
      </section>

      {!user && (
        <div className="dashboard-notice">
          <p>You are viewing the dashboard as a guest.</p>
          <Link to="/login">Log in</Link> to try the demo account flow.
        </div>
      )}

      <section className="dashboard-stats">
        <article>
          <span>Saved opportunities</span>
          <strong>{savedOpportunities.length}</strong>
        </article>
        <article>
          <span>Available listings</span>
          <strong>{opportunities.length}</strong>
        </article>
      </section>

      <section className="saved-section">
        <div className="saved-heading">
          <h2>Your saved opportunities</h2>
          <Link to="/opportunities">Explore more →</Link>
        </div>

        {savedOpportunities.length > 0 ? (
          <div className="saved-list">
            {savedOpportunities.map((item) => (
              <article className="saved-card" key={item.id}>
                <div>
                  <span className="saved-type">{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.organization} · {item.mode}</p>
                  <small>
                    Deadline: {new Date(item.deadline).toLocaleDateString("en-IN")}
                  </small>
                </div>

                <div className="saved-actions">
                  <Link to={`/opportunities/${item.id}`}>View details</Link>
                  <button onClick={() => removeSaved(item.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="saved-empty">
            <span className="saved-empty-icon">♡</span>
            <h3>No saved opportunities yet</h3>
            <p>Save opportunities you're interested in and find them here.</p>
            <Link to="/opportunities">Browse opportunities</Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;