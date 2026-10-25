import { useState } from "react";
import { Link } from "react-router-dom";
import "./InfoPages.css";

export function About() {
  return (
    <main className="info-page">
      <section className="info-hero">
        <span className="info-eyebrow">OUR PURPOSE</span>
        <h1>Opportunities should be easier to discover.</h1>
        <p>
          OpportuNext is a student-focused platform designed to bring
          internships, hackathons, scholarships, competitions and learning
          opportunities into one discoverable space.
        </p>
        <Link className="info-primary-link" to="/opportunities">
          Explore opportunities →
        </Link>
      </section>

      <section className="info-grid">
        <article>
          <span>01</span>
          <h2>The problem</h2>
          <p>
            Students often discover valuable opportunities late because
            information is scattered across websites, social channels and
            college groups.
          </p>
        </article>

        <article>
          <span>02</span>
          <h2>Our approach</h2>
          <p>
            Make opportunities easier to search, compare, save and revisit
            through a single student-friendly experience.
          </p>
        </article>

        <article>
          <span>03</span>
          <h2>Our vision</h2>
          <p>
            Help more students find relevant experiences, build practical
            skills and take the next step in their careers.
          </p>
        </article>
      </section>

      <section className="info-bottom">
        <h2>Your next opportunity could change your direction.</h2>
        <Link className="info-primary-link" to="/opportunities">
          Start exploring
        </Link>
      </section>
    </main>
  );
}

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General feedback",
    message: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Frontend demo only. No message is sent to a server.
    setStatus(
      "Demo submission complete. Connect a backend or form service to send this message."
    );
  }

  return (
    <main className="contact-page">
      <section className="contact-intro">
        <span className="info-eyebrow">WE'RE LISTENING</span>
        <h1>Get in touch.</h1>
        <p>
          Found an issue, have feedback, or want to suggest an opportunity?
          Send us a message.
        </p>
      </section>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Subject
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
          >
            <option>General feedback</option>
            <option>Report an opportunity</option>
            <option>Report an issue</option>
            <option>Partnership enquiry</option>
          </select>
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </label>

        <button type="submit">Submit message</button>

        {status && <p className="contact-status">{status}</p>}
      </form>
    </main>
  );
}