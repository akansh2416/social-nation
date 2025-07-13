<div align="center">
  <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&logoColor=3178C6" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" />
  <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logo=appwrite&logoColor=FD366E" />
  <img src="https://img.shields.io/badge/-React_Query-black?style=for-the-badge&logo=reactquery&logoColor=FF4154" />
</div>

<br />

# 🌐 Social Nation

**Social Nation** is a full-stack modern social media platform where users can create, explore, like, save, and share content — all powered by Appwrite as the backend and React + TypeScript on the frontend.

> Built with ❤️ using modern web tools and best practices.

---

## 📸 Preview

> Coming soon... *(add screenshots or a demo GIF once deployed)*

---

## 🚀 Features

- 🔐 **User Authentication** with Appwrite
- 🧾 **Create, Edit & Delete Posts**
- ❤️ **Like & Save Posts**
- 🧑‍🤝‍🧑 **Follow/Unfollow Users**
- 👤 **User Profiles with Editable Bio & Picture**
- 🔍 **Explore Section** with featured users/posts
- 💾 **Optimized Image Storage**
- 📱 **Mobile-Responsive UI**
- ⚡ **React Query for blazing-fast caching & mutations**

---

## 🧱 Tech Stack

| Tech             | Purpose                                    |
|------------------|--------------------------------------------|
| **React.js**     | UI library                                 |
| **TypeScript**   | Type safety                                |
| **Appwrite**     | Backend-as-a-service (Auth, DB, Storage)   |
| **Tailwind CSS** | Modern utility-first styling               |
| **Shadcn/ui**    | Reusable styled components                 |
| **React Query**  | Data fetching & caching                    |
| **Vite**         | Fast bundler for development               |

---

## 📁 Project Structure

/src
┣ /components
┣ /pages
┣ /lib → Appwrite + utilities
┣ /hooks → React Query hooks
┣ /context → Auth & state providers
┣ /constants → App-wide constants
┣ /types → Custom TS types
┣ App.tsx
┗ main.tsx

yaml
Copy
Edit

---

## 🛠️ Getting Started

### ✅ Prerequisites

- Node.js and npm
- Git
- Appwrite Project (self-hosted or cloud)

---

### 📥 1. Clone the Repository
git clone https://github.com/akansh2416/social-nation.git
cd social-nation

📦 2. Install Dependencies
bash
Copy
Edit
npm install

🔐 3. Set Up Environment Variables
Create a .env file in the root with the following:

env
Copy
Edit
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_USER_COLLECTION_ID=
VITE_APPWRITE_POST_COLLECTION_ID=
VITE_APPWRITE_SAVES_COLLECTION_ID=
VITE_APPWRITE_FOLLOWERS_COLLECTION_ID=
Replace with your actual Appwrite credentials.

🧪 4. Start the Development Server
bash
Copy
Edit
npm run dev
Visit: http://localhost:5173

👨‍💻 Author
Akansh Khanna



📜 License
This project is open source and available under the MIT License.

⭐️ Show Your Support
If you like this project:

🌟 Star this repo

🍴 Fork it

🧩 Suggest features or report bugs

🔗 Share it with others
