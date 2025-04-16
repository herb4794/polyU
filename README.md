# 🛒 PolyU E-Commerce App

A responsive e-commerce web application built with **React**, **Firebase**, and **Tailwind CSS**, supporting user authentication, product browsing, shopping cart, PayPal payments, and order history tracking.

📌 GitHub: [https://github.com/herb4794/polyU](https://github.com/herb4794/polyU)

🌐 Live Demo: [https://schoolapp-c2f68.web.app/](https://schoolapp-c2f68.web.app/)
---

## ⚙️ Tech Stack

- **React 18 + TypeScript**
- **Tailwind CSS 3**
- **Firebase v9+ (Auth, Firestore, Storage, Realtime DB)**
- **PayPal JS SDK Integration**
- **React Router v6**
- **Framer Motion (Animations)**
- **Chart.js (Reports)**
- **React Toastify (Toasts)**

---

## ✅ Features

- 🔐 **User Registration / Login**
  - Email + Password
  - Google OAuth
  - Avatar image upload
- 🛍️ **Product Listing & Shopping Cart**
  - Add / remove / update quantity
  - Stored in `localStorage`
- 💳 **PayPal Payment**
  - Supports one-click checkout
- 📦 **Order History Page**
  - Orders stored in Firestore
  - Displayed per user
- 🛠️ **Admin Panel**
  - Only visible to `admin@profile.com`

---

## 📦 Project Setup

```bash
git clone https://github.com/herb4794/polyU.git
cd polyU
npm install
npm start
```

> Make sure you configure your Firebase project inside `src/firebase/dbcon.ts`.

---

## 🔐 Firebase Storage Rule Suggestion

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    match /product/{allPaths=**} {
      allow read;
    }
  }
}
```

---

## 📁 Folder Structure

```
src/
├── assets/                 # Static images, logos, etc.
├── components/
│   ├── 404/               # NotFound page
│   ├── cart/              # Cart-related components
│   ├── controler/         # Logic controllers (maybe for layout or route)
│   ├── header/            # Navigation bar, modals, etc.
│   ├── home/              # Homepage components
│   ├── orderHistory/      # Past order views
│   ├── product/           # Product listings or detail components
│   ├── sidebar/           # Admin or layout sidebar
│   └── thankyou/          # Thank-you page after checkout
├── firebase/
│   └── dbcon.ts           # Firebase config
├── store/
│   └── Context.tsx        # Global context (auth, cart, etc.)
├── App.tsx
├── App.css
├── index.tsx
├── index.css
├── tailwind.config.js
└── tsconfig.json
```

---

## 📷 Screenshots (Coming Soon)

- Login
- Add to Cart
- Checkout via PayPal
- View Orders

---

## 👤 Author

**Lawrence Cheng**  
🎓 Student at The Hong Kong Polytechnic University  
📧 herb4794 (GitHub)

---

## 📜 License

This project is for educational and personal learning purposes only.
