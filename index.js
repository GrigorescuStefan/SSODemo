const express = require("express");
const { auth } = require("express-openid-connect");
require("dotenv").config();
const { requiresAuth } = require("express-openid-connect");

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.CLIENT_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));

app.get("/", (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  const user = req.oidc.user;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SSO Dashboard</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #eef2f7;
          color: #333;
        }
        header {
          background-color: #2f80ed;
          color: white;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          text-align: center;
        }
        .button {
          text-decoration: none;
          color: white;
          background-color: #2d9cdb;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          margin-top: 1rem;
          display: inline-block;
        }
        .user-info {
          font-size: 1.1rem;
          margin-top: 1rem;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>SSO Demo Dashboard</h1>
        ${
          isAuthenticated
            ? `<div class="user-info">👤 ${
                user.name || user.email
              } | <a class="button" href="/logout">Logout</a></div>`
            : `<a class="button" href="/login">Login</a>`
        }
      </header>

      <div class="container">
        ${
          isAuthenticated
            ? `
              <h2>Welcome, ${user.given_name || user.name || user.email}!</h2>
              <p>This is your personalized dashboard.</p>
              <a class="button" href="/profile">View Profile</a>
            `
            : `
              <h2>You are not logged in.</h2>
              <p>Please log in to access your dashboard.</p>
            `
        }
      </div>
    </body>
    </html>
  `);
});

app.get("/profile", requiresAuth(), (req, res) => {
  const user = req.oidc.user;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>User Profile</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9fbfd;
        }
        header {
          background-color: #2f80ed;
          color: white;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }
        .button {
          text-decoration: none;
          color: white;
          background-color: #2d9cdb;
          padding: 0.6rem 1.2rem;
          border-radius: 5px;
          margin: 0.5rem;
          display: inline-block;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
        }
        th, td {
          text-align: left;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>User Profile</h1>
        <div>
          <a class="button" href="/">Dashboard</a>
          <a class="button" href="/logout">Logout</a>
        </div>
      </header>

      <div class="container">
        <h2>Hello, ${user.name || user.email}</h2>
        <p>Here's your profile data:</p>
        <table>
          <tbody>
            ${Object.entries(user)
              .map(
                ([key, value]) => `
  <tr>
    <th>${key}</th>
    <td>
      ${
        key === "picture"
          ? `<img src="${value}" alt="User Picture" style="width:80px; border-radius:8px;">`
          : typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : value
      }
    </td>
  </tr>
`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.BASE_URL}`);
});
