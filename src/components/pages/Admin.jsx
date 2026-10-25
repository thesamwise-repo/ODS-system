import { useCallback, useEffect, useState } from "react";
import {
  createAdminOpportunity,
  fetchAdminOpportunities,
  loginAdmin,
} from "../../services/adminApi";
import "./Admin.css";

function Admin() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [form, setForm] = useState({
    title: "",
    organization: "",
    type: "Internship",
    mode: "Remote",
    location: "India",
    deadline: "",
    stipend: "0",
    description: "",
    applyUrl: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingItems, setLoadingItems] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const refreshOpportunities = useCallback(async () => {
    setLoadingItems(true);
    try {
      setItems(await fetchAdminOpportunities());
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchAdminOpportunities()
      .then((opportunities) => {
        if (!cancelled) setItems(opportunities);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingItems(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function updateCredential(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      const result = await loginAdmin(credentials.email, credentials.password);
      setToken(result.token);
      setCredentials((current) => ({ ...current, password: "" }));
      setMessage(`Signed in as ${result.user.name}.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function addOpportunity(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      await createAdminOpportunity(token, {
        title: form.title,
        organization: form.organization,
        type: form.type,
        mode: form.mode,
        location: form.location,
        deadline: form.deadline,
        stipend: Number(form.stipend),
        description: form.description,
        applyUrl: form.applyUrl,
      });

      setMessage("Opportunity saved successfully.");
      setForm({
        title: "",
        organization: "",
        type: "Internship",
        mode: "Remote",
        location: "India",
        deadline: "",
        stipend: "0",
        description: "",
        applyUrl: "",
      });
      await refreshOpportunities();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <span>OPPORTUNEXT · ADMIN</span>
        <h1>Opportunity management</h1>
        <p>Add and maintain the opportunities displayed to students.</p>
      </header>

      {!token ? (
        <section className="admin-panel">
          <h2>Admin sign in</h2>
          <form className="admin-form admin-login-form" onSubmit={handleLogin}>
            <label>
              Email address
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={updateCredential}
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={updateCredential}
                autoComplete="current-password"
                required
              />
            </label>
            <button className="admin-submit" type="submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
          {error && <p className="admin-error" role="alert">{error}</p>}
          {message && <p className="admin-message" role="status">{message}</p>}
        </section>
      ) : (
        <section className="admin-panel">
          <div className="admin-list-heading">
            <h2>Add an opportunity</h2>
            <button
              className="admin-logout"
              type="button"
              onClick={() => {
                setToken("");
                setMessage("You have been signed out.");
                setError("");
              }}
            >
              Sign out
            </button>
          </div>

        <form className="admin-form" onSubmit={addOpportunity}>
          <label>
            Opportunity title
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Organization
            <input
              name="organization"
              value={form.organization}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Category
            <select name="type" value={form.type} onChange={updateField}>
              {[
                "Internship",
                "Hackathon",
                "Scholarship",
                "Competition",
                "Workshop",
              ].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>

          <label>
            Mode
            <select name="mode" value={form.mode} onChange={updateField}>
              {["Remote", "Online", "Hybrid", "On-site"].map((mode) => (
                <option key={mode}>{mode}</option>
              ))}
            </select>
          </label>

          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Deadline
            <input
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Stipend / prize (₹)
            <input
              name="stipend"
              type="number"
              min="0"
              value={form.stipend}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Application URL
            <input
              name="applyUrl"
              type="url"
              value={form.applyUrl}
              onChange={updateField}
              placeholder="https://..."
              required
            />
          </label>

          <label className="admin-full-width">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              rows="4"
              required
            />
          </label>

          <button className="admin-submit" type="submit" disabled={submitting}>
            {submitting ? "Saving…" : "Add opportunity"}
          </button>
        </form>

        {error && <p className="admin-error" role="alert">{error}</p>}
        {message && <p className="admin-message" role="status">{message}</p>}
        </section>
      )}

      <section className="admin-panel">
        <div className="admin-list-heading">
          <h2>Current opportunities</h2>
          <span>{items.length} records</span>
        </div>

        {loadingItems ? (
          <p>Loading opportunities…</p>
        ) : error && items.length === 0 ? (
          <p className="admin-error" role="alert">{error}</p>
        ) : items.length === 0 ? (
          <p>No opportunities found.</p>
        ) : (
          <div className="admin-records">
          {items.map((item) => (
            <article className="admin-record" key={item._id}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.organization} · {item.type} · {item.deadline ? new Date(item.deadline).toLocaleDateString() : "No deadline"}</p>
              </div>
            </article>
          ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Admin;