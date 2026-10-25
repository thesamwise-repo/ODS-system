import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth({ mode = "login" }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Demo only: this is NOT secure authentication.
    const users = JSON.parse(localStorage.getItem("ods-demo-users") || "[]");

    if (isSignup) {
      const alreadyExists = users.some((user) => user.email === email);

      if (alreadyExists) {
        setMessage("An account with this email already exists.");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("ods-demo-users", JSON.stringify(users));
      localStorage.setItem("ods-demo-user", JSON.stringify({ name, email }));
    } else {
      const user = users.find(
        (item) => item.email === email && item.password === password
      );

      if (!user) {
        setMessage("Invalid email or password. Create a demo account first.");
        return;
      }

      localStorage.setItem(
        "ods-demo-user",
        JSON.stringify({ name: user.name, email: user.email })
      );
    }

    navigate("/dashboard");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">OpportuNext</Link>

        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p>
          {isSignup
            ? "Start discovering opportunities made for your future."
            : "Continue exploring opportunities and building your future."}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Full name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </label>

          {message && <p className="auth-message">{message}</p>}

          <button className="auth-submit" type="submit">
            {isSignup ? "Create account" : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to OpportuNext?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Auth;