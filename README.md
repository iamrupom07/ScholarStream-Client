# ScholarStream Client

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-success.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-blueviolet)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


**ScholarStream** is a modern web application that helps students discover, review, and apply for scholarships. The client-side (frontend) is built with React + Vite and features a clean, responsive UI with secure authentication, scholarship search, detailed views, reviews, and paid application processing via Stripe.


This is the **frontend** repository. The backend (Node.js/Express/MongoDB/Stripe) is available here: [ScholarStream-Server](https://github.com/iamrupom07/ScholarStream-Server)


## 🚀 Features

- **Scholarship Discovery** — Search and filter scholarships by category, subject, location, etc.
- **Detailed Scholarship Pages** — View university info, deadlines, fees, description, and student reviews.
- **User Reviews & Ratings** — Authenticated users can submit one review per scholarship.
- **Paid Applications** — Secure application submission with Stripe Checkout for processing fees.
- **User Dashboard** — View saved scholarships, applied applications, reviews, and payment history.
- **Admin/Moderator Panel** — Manage users, scholarships, applications, and view stats.
- **Responsive Design** — Mobile-friendly UI with Tailwind CSS.
- **Secure Authentication** — Firebase Authentication with role-based access (Student, Moderator, Admin).


## 🛠️ Tech Stack

| Category          | Technologies                                      |
|-------------------|---------------------------------------------------|
| Frontend          | React 18, Vite, React Router v6, TanStack Query |
| Styling           | Tailwind CSS, DaisyUI (optional)                  |
| State Management  | React Context, TanStack Query                     |
| Authentication    | Firebase Auth (custom token verification)         |
| Payments          | Stripe Checkout                                   |
| Icons             | React Icons                                       |
| Deployment        | Firebase Hosting (live: https://schloarstream.web.app) |


## 📦 Installation & Setup

### Prerequisites
- Node.js v18+
- npm or yarn
- Firebase project (for auth)
- Backend server running (or mocked)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/iamrupom07/ScholarStream-Client.git
   cd ScholarStream-Client
