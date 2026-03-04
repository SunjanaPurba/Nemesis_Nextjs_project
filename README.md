# ProStore – Product Management

A modern product management application built with Next.js (App Router) and NextAuth.js. Features public and protected pages, authentication (Google + credentials), and a responsive UI.

## Features

- **Landing Page** – Hero, features, testimonials, banner, and about sections
- **Authentication** – Login/Register with Google OAuth and email/password
- **Products List** – Search, filter by priority, grid of product cards
- **Product Details** – Full product view with image, description, and meta
- **Protected Pages** – Add Product and Manage Products (requires login)
- **Responsive Design** – Works on mobile, tablet, and desktop

## Tech Stack

- Next.js 16 (App Router)
- NextAuth.js (Google + Credentials)
- React 19
- Tailwind CSS 4
- MongoDB (Mongoose)
- React Hot Toast

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone
   cd productmanagement
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**

   Create a `.env.local` file in the root:


4. **Run the development server**
   ```bash
   npm run dev
   ```

## Route Summary

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Landing page (Hero, Features, Testimonials, About) |
| `/products` | Public | Product list with search and filter |
| `/products/[id]` | Public | Product detail page |
| `/login` | Public | Login / Register (Google + credentials) |
| `/dashboard/add-product` | Protected | Add new product form |
| `/dashboard/manage-products` | Protected | Manage products (View, Delete) |

## Project Structure

```
├── components/       # Navbar, Footer, ProductCard, Providers
├── src/
│   ├── app/
│   │   ├── api/      # Auth, products API routes
│   │   ├── dashboard/  # Protected pages
│   │   ├── login/
│   │   ├── products/
│   │   └── layout.jsx
│   ├── lib/          # db, api helpers
│   └── models/       # Product, User (Mongoose)
├── middleware.js     # Protects /dashboard/*
└── .env.local        # Environment variables
```
