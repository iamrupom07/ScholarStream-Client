# 📚 ScholarStream Client

This repository contains the client-side (frontend) code for **ScholarStream**, a full-stack web application. This is the User Interface (UI) that users interact with in their browser. It communicates with the [ScholarStream Server]([https://github.com/iamrupom07/ScholarStream-Server](https://github.com/iamrupom07/ScholarStream-Server)) to fetch and display data.

## 🔗 Quick Links

* **Live Website:** `[https://schloarstream.web.app/]`
* **Server-Side Repository:** `[https://github.com/iamrupom07/ScholarStream-Server]`
* **Live Server API:** `[https://scholar-stream-server-tau.vercel.app/]`

---

## ✨ Features

* **User Authentication:** Secure user registration, login (including social login via Google), and logout.
* **Responsive Design:** Fully responsive UI that works on desktop, tablet, and mobile devices.
* **Protected Routes:** User-specific pages like "My Applications" and "Dashboard" are protected and only accessible to logged-in users.
* **Scholarship Search:** Browse and search scholarships by category, country, or university.
* **Application System:** Users can apply for scholarships with document uploads and track application status.
* **Payment Integration:** Secure payment processing using Stripe for application fees.
* **Review System:** Users can add reviews and ratings for scholarships.
* **Admin Dashboard:** Admins can manage scholarships, users, and applications through a dedicated dashboard.

---

## 🛠️ Technology Stack

* **Framework:** [React.js](https://reactjs.org/)
* **Routing:** [React Router](https://reactrouter.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [daisyUI](https://daisyui.com/)
* **Authentication:** [Firebase Authentication](https://firebase.google.com/products/auth)
* **Data Fetching:** [TanStack Query](https://tanstack.com/query)
* **Payment:** [Stripe](https://stripe.com/)
* **Hosting:** [Netlify](https://www.netlify.com/)

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your local machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/iamrupom07/ScholarStream-Client.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd ScholarStream-Client
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Create an environment file:**
    Create a `.env.local` file in the root of the project. Add the following environment variables:

    ```env
    VITE_API_URL=http://localhost:5000
    VITE_APIKEY=your_firebase_api_key
    VITE_AUTHDOMAIN=your_firebase_auth_domain
    VITE_PROJECTID=your_firebase_project_id
    VITE_STORAGEBUCKET=your_firebase_storage_bucket
    VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
    VITE_APPID=your_firebase_app_id
    VITE_IMGBB_API_KEY=your_imgbb_api_key
    VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
    ```

5.  **Run the application:**
    ```sh
    npm run dev
    ```
The application will open in your browser at `http://localhost:5173`

---

## 🧑‍💻 Author

* **Rupom (iamrupom07)**
* GitHub: [@iamrupom07](https://github.com/iamrupom07)

---




