# 🔐 WIT Cypress Login Test Project

## 🇹🇷 Proje Hakkında

Bu proje, modern bir React uygulamasında **authentication (giriş) akışının test edilmesi** amacıyla geliştirilmiştir.
Frontend tarafında basit bir login sistemi kurulmuş, **Cypress** kullanılarak uçtan uca (E2E) test senaryoları yazılmıştır.

Projenin temel amacı:

- Form validasyonu mantığını göstermek
- Kullanıcı akışlarını test etmek
- Gerçek dünya senaryolarına yakın E2E testler yazmak

---

## 🇬🇧 About The Project

This project demonstrates how to test an **authentication flow in a modern React application**.
A simple login system is implemented and tested using **Cypress End-to-End (E2E)** testing.

Main goals:

- Demonstrate form validation logic
- Simulate real user behavior
- Write realistic E2E test scenarios

---

## 🚀 Features

- 🔑 Login form with validation
- 📧 Email & password validation (regex based)
- ✅ Terms & conditions requirement
- 🔄 Route-based navigation (`/main`, `/error`)
- 🧪 Cypress E2E test coverage
- ⚡ Built with Vite for fast development

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- Vite

### Testing

- Cypress (E2E Testing)

---

## 📂 Project Structure

```
cypress/
  e2e/
    login.cy.js     # E2E test scenarios

src/
  components/
    Login.jsx       # Main login logic
    Success.jsx     # Success page
    Error.jsx       # Error page

App.jsx             # Routing configuration
```

---

## 🔐 Authentication Flow

1. User enters email & password
2. Inputs are validated (regex)
3. Terms checkbox must be accepted
4. API request is sent (mock API)
5. If credentials match → `/main`
6. If not → `/error`

---

## 🧪 Test Scenarios (Cypress)

The project includes multiple real-world test cases:

### ✅ Positive Case

- Successful login redirects to `/main`

### ❌ Negative Cases

- Invalid email format
- Invalid password format
- Both email & password invalid
- Terms not accepted
- Valid but non-existing credentials → `/error`

Example:

```js
cy.get('[type="email"]').type("test@example.com");
cy.get('[type="password"]').type("Password123!");
cy.get('[type="checkbox"]').check();
cy.get('[type="submit"]').click();

cy.url().should("include", "/main");
```

---

## ⚙️ Installation

```bash
git clone https://github.com/mertkaya20/wit-cypress.io.git
cd wit-cypress.io
npm install
npm run dev
```

---

## 🧪 Run Cypress Tests

```bash
npx cypress open
```

or headless:

```bash
npx cypress run
```

---

## 🎯 Purpose of This Project

This project is built to:

- Practice frontend validation logic
- Understand user authentication flow
- Gain hands-on experience with Cypress
- Simulate real-world testing scenarios

---

## 👨‍💻 Author

**Mert Kaya**

- GitHub: https://github.com/mertkaya20/
- LinkedIn: https://www.linkedin.com/in/merttkaya20/

---

## 📌 Notes

- This project uses a mock API for demonstration purposes.
- Not intended for production use.
- Focus is on testing and validation logic.

---

## 📄 License

MIT
