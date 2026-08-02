# Mum Mum - The Food Ordering Website With Stripe Integration

A full-stack food ordering website built with the MERN stack (MongoDB, Express.js, React, Node.js) with Stripe payment integration. This website enables users to browse restaurants, explore menus, add items to cart, and place orders with a seamless minimalist UI.



## Authors

- [@AnandhaSivam-00](https://www.github.com/Anandhasivam-sambathkumar)


## Features

- Minimal UI Experience
- Custom Restaurant cards and Menus
- Order from multiple restaurants in a single payment
- Simple order tracking
- User authentication (Register, Login, Forgot/Reset Password)
- Credit Card payment using Stripe API
- Image uploads via Cloudinary
- Email notifications using MailTrap API


## Tech Stack

**Client:** React, Redux, Bootstrap, Vite

**Server:** Node.js, Express.js

**Database:** MongoDB (Cloud - MongoDB Atlas)

**Payment:** Stripe

**Image Storage:** Cloudinary

**Email Testing:** MailTrap


## Documentation

- [Food Ordering Website Documentation](https://drive.google.com/file/d/12IrkBxd9Kc_Yl1Ef-te2vJ1ysDjzxuf7/view?usp=drivesdk)

- [Project PPT](https://docs.google.com/presentation/d/1rc6y_JHaUf9X5quyROnwFAHu80l8wctu/edit?usp=drivesdk&ouid=113370873376116494206&rtpof=true&sd=true)


## Demo

Link to Demo on Youtube :
[Live Demo Link](https://youtu.be/DdHBDOcMlXI?feature=shared)


## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)
- A [Cloudinary](https://cloudinary.com/) account for image uploads
- A [Stripe](https://stripe.com/) account for payment processing
- A [MailTrap](https://mailtrap.io/) account for email testing


## Clone the Repository

```bash
git clone https://github.com/Anandhasivam-sambathkumar/anand-app.git
cd anand-app
```


## Environment Variables

You need to configure environment variables for both the Backend and Frontend before running the project.

### Backend — `Backend/config/config.env`

Create a file named `config.env` inside the `Backend/config/` directory and add the following variables:

```env
# Server
PORT=4000
NODE_ENV=DEVELOPMENT

# MongoDB Connection String
# Get this from your MongoDB Atlas dashboard (or use a local URI)
DB_LOCAL_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRES_TIME=90

# Frontend URL (used for CORS and email reset links)
FRONTEND_URL=http://localhost:3000

# Cloudinary (for image uploads)
# Get these from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# MailTrap (for email testing)
# Get these from https://mailtrap.io/inboxes
EMAIL_USERNAME=<your-mailtrap-username>
EMAIL_PASSWORD=<your-mailtrap-password>
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_FROM=MumMum.com

# Stripe (for payment processing)
# Get these from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_API_KEY=<your-stripe-publishable-key>
```

### Frontend — `Frontend/.env`

Create a file named `.env` inside the `Frontend/` directory and add the following:

```env
VITE_BACKEND_URL=http://localhost:4000
```

> **Note:** `VITE_BACKEND_URL` must match the backend `PORT` value. The default backend port is `4000`.


## Run Locally

### Step 1 — Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

### Step 2 — Install Frontend Dependencies

Open a second terminal and run:

```bash
cd frontend
npm install
```

### Step 3 — Start the Backend Server

In the Backend terminal:

```bash
npm run dev
```

This starts the server on `http://localhost:4000` in development mode with auto-reload (nodemon).

Other backend scripts:

| Command | Description |
|---|---|
| `npm start` | Start server in production mode (no auto-reload) |
| `npm run dev` | Start server in development mode with nodemon |
| `npm run prod` | Start server with NODE_ENV set to PRODUCTION |
| `npm run seeder` | Seed the database with initial data (restaurants, menus, etc.) |

### Step 4 — Start the Frontend App

In the Frontend terminal:

```bash
npm run dev
```

This starts the Vite dev server. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`).

Other frontend scripts:

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in the `dist/` folder |
| `npm run preview` | Preview the production build locally |


## Database Seeding

To populate the database with sample data (restaurants, menus, food items), run:

```bash
cd backend
npm run seeder
```

> **Note:** Make sure your `DB_LOCAL_URI` in `config.env` is correctly set before seeding.


## Deployment

To create a production build of the frontend:

```bash
cd frontend
npm run build
```

The optimized production files will be generated in the `frontend/dist/` directory. Deploy this folder to any static hosting service (e.g., Vercel, Netlify, or your own server).

For the backend, deploy the `backend/` folder to a Node.js hosting service (e.g., Render, Railway, or Heroku) and set the environment variables in the hosting provider's dashboard.


## Project Structure

```
mum-mum-webapp/
├── backend/
│   ├── config/          # Environment config & database connection
│   ├── controllers/     # Route controllers (auth, orders, payments, etc.)
│   ├── middlewares/     # Error handling & async error wrappers
│   ├── models/          # Mongoose schemas (User, Order, Restaurant, etc.)
│   ├── routes/          # API route definitions
│   ├── utils/           # Utilities (seeder, email, API features)
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── actions/     # Redux actions
│   │   ├── components/  # React components (pages, UI)
│   │   ├── constants/   # Redux action type constants
│   │   ├── reducers/    # Redux reducers
│   │   ├── App.jsx      # Root React component
│   │   └── index.jsx    # React entry point
│   └── vite.config.js   # Vite configuration
└── README.md
```


## Note
This app may take time to spin-up for the first-time due to Render's cold start
