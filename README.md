📌 Introduction
The Parcel Management System is a MERN stack-based web application that allows users to book parcels, admins to manage deliveries, and delivery personnel to track and deliver parcels. This system provides a secure, responsive, and feature-rich experience with user authentication, real-time updates, and advanced search functionalities.

📑 Table of Contents
🚀 Features
🛠 Tech Stack
📥 Installation
💻 Usage
👥 User Roles
📊 Admin Dashboard
📦 User Dashboard
📍 Delivery Personnel Dashboard
🔧 Configuration
🔍 API Endpoints
🛡 Security Measures
🎨 UI & Animations
🐞 Troubleshooting
📜 License
🚀 Features
✅ User Authentication (Email/Password, Social Login)
✅ Parcel Booking System (Users can book and manage parcels)
✅ Admin Panel (Assign deliveries, manage users, view analytics)
✅ Delivery Tracking (Delivery personnel can update parcel statuses)
✅ Live Notifications (Toast/Sweet Alert for all actions)
✅ Secure API with JWT Authentication
✅ Search & Filtering (Users/Admin can filter bookings)
✅ Interactive Maps (Parcel location tracking with React MapGL/Leaflet)
✅ Real-time Statistics (Charts for bookings, deliveries, and users)
✅ Payment Integration (Stripe for secure online payments)

🛠 Tech Stack
Frontend: React.js, Vite, Shadcn, TailwindCSS, TanStack Query
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: Firebase, JWT
State Management: Context API
API Calls: TanStack Query
UI Library: Shadcn (Radix UI)
Charts & Maps: React Apex Charts, React MapGL / Leaflet
Payments: Stripe
📥 Installation
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-repo/parcel-management-system.git
cd parcel-management-system
2️⃣ Install Dependencies
Client-side
sh
Copy
Edit
cd client
npm install
Server-side
sh
Copy
Edit
cd server
npm install
3️⃣ Configure Environment Variables
Create a .env file in both client/ and server/ directories with:

Client (.env)
ini
Copy
Edit
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
Server (.env)
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
4️⃣ Start the Application
Client
sh
Copy
Edit
npm run dev
Server
sh
Copy
Edit
npm start
💻 Usage
1️⃣ Register/Login (Choose User, Delivery Men, or Admin)
2️⃣ Book Parcels (Fill out the booking form)
3️⃣ Manage Parcels (Update, cancel, track status)
4️⃣ Admin Assigns Delivery Person
5️⃣ Delivery Person Updates Parcel Status
6️⃣ Users Can Review Deliveries
7️⃣ Users Can Make Payments via Stripe
8️⃣ Admins Can View Stats & Manage Users

👥 User Roles
Role	Permissions
User	Book parcels, track status, make payments, leave reviews
Delivery Men	View assigned deliveries, update status, view reviews
Admin	Manage users, assign deliveries, view statistics
📊 Admin Dashboard
✅ All Parcels (Manage parcel deliveries)
✅ All Users (Promote to Admin/Delivery Man)
✅ All Delivery Men (Track deliveries & performance)
✅ Statistics Page (Bookings & deliveries charts)
✅ Search & Filter (Date-based parcel searches)

📦 User Dashboard
✅ Book a Parcel (Dynamic pricing based on weight)
✅ My Parcels (Update, cancel, track status)
✅ My Profile (Update profile & image)
✅ Secure Payments (Stripe integration)

📍 Delivery Personnel Dashboard
✅ My Delivery List (View assigned parcels)
✅ Update Parcel Status (Mark as delivered/canceled)
✅ View Location on Map
✅ View Reviews & Ratings

🔧 Configuration
Firebase Authentication (For user authentication & profile storage)
MongoDB (For user, parcel & delivery records)
JWT Authentication (For securing API endpoints)
Stripe Payments (For handling parcel payments)
React Apex Charts (For real-time statistics)
🔍 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate user
GET	/api/parcels	Get all parcels
POST	/api/parcels/book	Book a new parcel
PATCH	/api/parcels/update/:id	Update parcel info
DELETE	/api/parcels/cancel/:id	Cancel a parcel
POST	/api/payments/checkout	Process Stripe payment
🛡 Security Measures
✅ JWT for Authentication (Secured API endpoints)
✅ Environment Variables (Firebase & MongoDB credentials hidden)
✅ Role-based Access Control (User, Admin, Delivery Man restrictions)
✅ Validation on Forms (Proper data handling & input validation)

🎨 UI & Animations
Shadcn Components (Modern & minimal UI elements)
React CountUp (Animated statistics)
SweetAlert2 / Toasts (For notifications)
Loading Spinners & Skeletons (For smooth UX)
🐞 Troubleshooting
🔴 MongoDB Connection Issues
Ensure MongoDB URI is correct in .env file
Check if MongoDB server is running
🔴 Firebase Authentication Not Working
Verify Firebase API keys in .env
Check Firebase project settings
🔴 Stripe Payments Not Processing
Ensure Stripe API keys are correct
Test in Stripe’s sandbox mode
📜 License
This project is licensed under the MIT License.

🌐 Live Demo: Click Here
👤 Admin Login:
Username: admin@example.com
Password: admin123

