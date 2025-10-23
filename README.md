# 🌟 Wish List App

A modern, responsive wish list application built with **React**, **TypeScript**, **Context API**, and **JSON Server**. Users can add, edit, delete, and view wishes with clean UI, modal interactions, sorting, and pagination.

---

## 🚀 Getting Started

Follow these steps to run the app locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wishlist.git
cd wishlist-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the local database
#### Create a file named db.json in the root folder:

```bash
{
  "wishes": []
}
```

#### or use our sample data

```bash
{
  "wishes": [
    {
      "id": 1,
      "title": "MacBook Air",
      "description": "Light and powerful",
      "price": 1200,
      "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "createdAt": "2025-10-23T17:00:00.000Z"
    }
  ]
}
```

### 4. Start JSON Server

```bash
npx json-server --watch db.json --port 3001
```
#### This will run a local REST API at http://localhost:3001/wishes.

### 5. Start the React app
#### If you're using Vite:

```bash
npm run dev
```

#### The app will be available at http://localhost:5173

# 🛠 Tech Stack

   #### ⚛️ React + TypeScript

   #### 📦 Context API

   #### 🎨 Tailwind CSS

   #### 🗃️ JSON Server

   #### 🧭 React Router

   #### 🧩 Custom Hooks

# 📦 Features

   #### ✅ Add, edit, delete wishes

   #### ✅ Modal forms with validation

   #### ✅ Sorting by date and price

   #### ✅ Pagination

   #### ✅ Snackbar notifications

   #### ✅ Responsive design

   #### ✅ Wish detail page

   #### ✅ Blur background on modal open

   #### ✅ Clean UI with hover effects and shadows    