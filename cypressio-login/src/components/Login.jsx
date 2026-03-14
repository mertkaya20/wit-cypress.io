import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  return /(?=^.{6,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/.test(
    password,
  );
};

const styles = {
  wrap: {
    minHeight: "480px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "var(--color-background-primary, #fff)",
    border: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "380px",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#999",
    margin: "0 0 6px",
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "26px",
    fontWeight: 400,
    color: "var(--color-text-primary, #111)",
    margin: "0 0 1.75rem",
    lineHeight: 1.2,
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--color-text-secondary, #555)",
    marginBottom: "6px",
  },
  input: (hasError) => ({
    width: "100%",
    height: "40px",
    background: "var(--color-background-secondary, #f9f9f9)",
    border: `0.5px solid ${hasError ? "#e24b4a" : "var(--color-border-tertiary, #e5e5e5)"}`,
    borderRadius: "8px",
    padding: "0 12px",
    fontSize: "14px",
    color: "var(--color-text-primary, #111)",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
  }),
  errorMsg: {
    fontSize: "12px",
    color: "#e24b4a",
    marginTop: "4px",
  },
  termsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    margin: "1.25rem 0 1.75rem",
  },
  termsLabel: {
    fontSize: "13px",
    color: "var(--color-text-secondary, #555)",
    lineHeight: 1.5,
    cursor: "pointer",
  },
  button: (disabled) => ({
    width: "100%",
    height: "42px",
    background: disabled
      ? "var(--color-text-primary, #111)"
      : "var(--color-text-primary, #111)",
    color: "var(--color-background-primary, #fff)",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "inherit",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.3 : 1,
    transition: "opacity 0.15s",
    letterSpacing: "0.01em",
  }),
  divider: {
    height: "0.5px",
    background: "var(--color-border-tertiary, #e5e5e5)",
    margin: "1.5rem 0",
  },
  bottomNote: {
    textAlign: "center",
    fontSize: "13px",
    color: "#999",
    margin: 0,
  },
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [touched, setTouched] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const isValid =
    validateEmail(form.email) && validatePassword(form.password) && form.terms;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setForm({ ...form, [name]: newValue });

    if (name === "email" && touched.email) {
      setErrors((prev) => ({ ...prev, email: !validateEmail(value) }));
    }

    if (name === "password" && touched.password) {
      setErrors((prev) => ({ ...prev, password: !validatePassword(value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: !validateEmail(value) }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: !validatePassword(value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) =>
            item.password === form.password && item.email === form.email,
        );
        if (user) {
          setForm(initialForm);
          navigate("/main");
        } else {
          navigate("/error");
        }
      });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />
      <div style={styles.wrap}>
        <div style={styles.card}>
          <p style={styles.eyebrow}>Welcome back</p>
          <h1 style={styles.title}>Sign in to your account</h1>

          {/* Email */}
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input(touched.email && errors.email)}
            />
            {touched.email && errors.email && (
              <p style={styles.errorMsg}>Please enter a valid email address</p>
            )}
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 4 characters"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input(touched.password && errors.password)}
            />
            {touched.password && errors.password && (
              <p style={styles.errorMsg}>
                Password must be 6-12 characters, include at least one uppercase
                letter, one lowercase letter, one number, and one special
                character. No spaces allowed, max 2 repetitive characters.
              </p>
            )}
          </div>

          {/* Terms */}
          <div style={styles.termsRow}>
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={form.terms}
              onChange={handleChange}
              style={{
                width: "16px",
                height: "16px",
                marginTop: "2px",
                flexShrink: 0,
                cursor: "pointer",
              }}
            />
            <label htmlFor="terms" style={styles.termsLabel}>
              I agree to the terms of service and privacy policy
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            style={styles.button(!isValid)}
          >
            Login
          </button>

          <div style={styles.divider} />
          <p style={styles.bottomNote}>
            Don't have an account?{" "}
            <span
              style={{
                color: "var(--color-text-primary, #111)",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
