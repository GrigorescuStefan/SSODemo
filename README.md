# 🔐 Node.js Single Sign-On (SSO) Demo with Auth0

This project demonstrates how to implement Single Sign-On (SSO) in a Node.js Express app using **Auth0** as the identity provider. It includes login/logout functionality, protected routes, user profile data, and a clean, styled dashboard UI.

---

## 🚀 Features

- Auth0 integration using `express-openid-connect`
- Secure login/logout routes
- Protected `/profile` route

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Auth0
- express-openid-connect
- dotenv for config

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/GrigorescuStefan/SSODemo.git
cd SSODemo/
npm install
```
### 2. Configure Auth0
- Created a user and tenant via [Auth0's management dashboard](https://manage.auth0.com).
- Create a `Regular Web Application` using `Node.js (Express)` and choose to `integrate with my app`.
- Configure the `Allowed Callback URL` and `Allowed Logout URL` to redirect users after logging in or out.
- Configured the Issuer URL, Client ID, and Client Secret to connect the application with the Auth0 service.

```bash
node index.js
```