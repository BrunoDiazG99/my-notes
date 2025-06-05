# My Notes

A full-stack web application for managing notes and categories, featuring archiving and color customization. The project is split into a backend (Node.js/Express/Sequelize/PostgreSQL) and a frontend (React/Vite/TypeScript).

## Features

- Create, edit, archive, restore, and delete notes
- Organize notes by categories
- Color-code notes
- Filter notes by category
- Archive and restore notes

---

## Technologies Used

### Backend (`/backend`)

- **Node.js**
- **Express**
- **Sequelize**
- **PostgreSQL**
- **TypeScript**

### Frontend (`/frontend/my-notes`)

- **React**
- **Vite**
- **TypeScript**
- **Zustand**
- **Lucide-react**

### Deployment

- **Supabase** (Databse)
- **Render** (Backend)
- **Github Pages** (Frontend)

---

## Project Structure

```
my-notes/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── package.json
│   └── tsconfig.json
│
│
└── frontend/
    └── my-notes/
        ├── src/
        │   ├── components/
        │   ├── store/
        │   ├── services/
        │   ├── types/
        │   ├── styles/
        │   ├── App.tsx
        │   └── main.tsx
        ├── public/
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        └── index.html
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Backend Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
1. Run the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Install dependencies:
   ```sh
   cd frontend/my-notes
   npm install
   ```
2. Run the frontend dev server:
   ```sh
   npm run dev
   ```

### Feeling lazy?

Install dependencies from the root:

```sh
npm run install-front
npm run install-back
```

And run both servers concurrently:

```sh
npm run dev
```

## Final product

Browse https://brunodiazg99.github.io/my-notes/ to check the deployed version of this project

## Author

Bruno Diaz

## Links

- [Frontend Source](frontend/my-notes)
- [Backend Source](backend)
- [Deployed project](https://brunodiazg99.github.io/my-notes/)
