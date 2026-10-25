import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOpportunities } from "../../services/opportunityService";
import { opportunityTypes } from "./opportunitiesData";
import "./opportunities.css";

function asText(value) {
  return String(value ?? "");
}

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(() => new URLSearchParams(window.location.search).get("search") ?? "");
  const [category, setCategory] = useState(() => new URLSearchParams(window.location.search).get("category") ?? "");
  const [mode, setMode] = useState(() => new URLSearchParams(window.location.search).get("mode") ?? "");
  const [sort, setSort] = useState(() => new URLSearchParams(window.location.search).get("sort") ?? "deadline");

  

  useEffect(() => {
    async function loadOpportunities() {
      try {
        const data = await fetchOpportunities();
        setOpportunities(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadOpportunities();
  }, []);

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = opportunities.filter((item) => {
      const matchesQuery = !query || [
        item.title,
        item.organization,
        item.type,
        item.description,
        item.location,
        ...(Array.isArray(item.skills) ? item.skills : []),
      ].some((value) => asText(value).toLowerCase().includes(query));
      const matchesCategory = !category || asText(item.type).toLowerCase() === category.toLowerCase();
      const matchesMode = !mode || asText(item.mode).toLowerCase() === mode.toLowerCase();

      return matchesQuery && matchesCategory && matchesMode;
    });

    return filtered.sort((first, second) => {
      if (sort === "title") return asText(first.title).localeCompare(asText(second.title));
      if (sort === "stipend") return Number(second.stipend || 0) - Number(first.stipend || 0);
      return new Date(first.deadline || 0) - new Date(second.deadline || 0);
    });
  }, [category, mode, opportunities, search, sort]);

  function updateFilter(name, value) {
    const setters = {
      search: setSearch,
      category: setCategory,
      mode: setMode,
      sort: setSort,
    };
    setters[name]?.(value);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setMode("");
    setSort("deadline");
  }

  if (loading) {
    return <p>Loading opportunities...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  return (
    <main className="listing-page">
      <section className="listing-intro">
        <span className="listing-eyebrow">FIND YOUR NEXT STEP</span>
        <h1>Explore opportunities</h1>
        <p>Search internships, hackathons, scholarships and more in one place.</p>
        <input
          className="listing-search"
          type="search"
          aria-label="Search opportunities"
          placeholder="Search by title, organization, skill or location..."
          value={search}
          onChange={(event) => updateFilter("search", event.target.value)}
        />
      </section>

      <div className="listing-layout">
        <aside className="filter-panel" aria-label="Opportunity filters">
          <h2>Filters</h2>
          <label htmlFor="category-filter">Category</label>
          <select id="category-filter" value={category} onChange={(event) => updateFilter("category", event.target.value)}>
            <option value="">All categories</option>
            {opportunityTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>

          <label htmlFor="mode-filter">Mode</label>
          <select id="mode-filter" value={mode} onChange={(event) => updateFilter("mode", event.target.value)}>
            <option value="">All modes</option>
            {[...new Set(opportunities.map((item) => asText(item.mode)).filter(Boolean))].map((itemMode) => (
              <option key={itemMode} value={itemMode}>{itemMode}</option>
            ))}
          </select>

          <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters</button>
        </aside>

        <section className="listing-results" aria-live="polite">
          <div className="results-heading">
            <div>
              <h2>{filteredOpportunities.length} opportunities</h2>
              <p>Explore listings selected for students.</p>
            </div>
            <select aria-label="Sort opportunities" value={sort} onChange={(event) => updateFilter("sort", event.target.value)}>
              <option value="deadline">Sort by deadline</option>
              <option value="title">Sort by title</option>
              <option value="stipend">Highest stipend / prize</option>
            </select>
          </div>

          <div className="listing-cards">
            {filteredOpportunities.length ? filteredOpportunities.map((item) => (
              <article className="listing-card" key={item._id ?? item.id}>
                <div className="listing-card-top">
                  <span className="listing-company-icon" aria-hidden="true">{asText(item.organization).charAt(0) || "?"}</span>
                  <span className="listing-type">{asText(item.type)}</span>
                </div>
                <h3>{asText(item.title)}</h3>
                <p className="listing-organization">{asText(item.organization)} · {asText(item.location)}</p>
                <div className="listing-tags">
                  {item.mode && <span>{asText(item.mode)}</span>}
                  {item.duration && <span>{asText(item.duration)}</span>}
                  {(Array.isArray(item.skills) ? item.skills : []).slice(0, 2).map((skill, index) => <span key={`${skill}-${index}`}>{asText(skill)}</span>)}
                </div>
                <p className="listing-description">{asText(item.description)}</p>
                <div className="listing-card-bottom">
                  <div>
                    <strong>{Number(item.stipend) > 0 ? `₹${Number(item.stipend).toLocaleString("en-IN")}` : "No stipend listed"}</strong>
                    <small>Deadline: {item.deadline && !Number.isNaN(new Date(item.deadline).getTime()) ? new Date(item.deadline).toLocaleDateString("en-IN") : "Not specified"}</small>
                  </div>
                  <Link className="details-link" to={`/opportunities/${item._id ?? item.id}`}>View details →</Link>
                </div>
              </article>
            )) : (
              <div className="no-results">
                <h3>No matching opportunities</h3>
                <p>Try another search or clear your filters.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Opportunities;