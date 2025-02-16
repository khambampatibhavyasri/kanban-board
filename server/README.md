MERN Stack Kanban Board - Server Side
This is the Server-Side (Backend) part of the Kanban Board application built using Node.js, Express, and MongoDB as part of the MERN Stack.
Features
REST API development using Express.js
MongoDB database integration using Mongoose
Environment variable configuration using dotenv
CORS enabled for frontend interaction
Hot-reloading using nodemon
Folder Structure
server/
│
├── models/
├── routes/
├── controllers/
├── .env
├── index.js
├── package.json
└── README.md
Getting Started
Prerequisites
Ensure you have the following installed:
Node.js (v18 or above recommended)
npm or yarn
MongoDB (local installation or cloud instance)
Installation
Clone the repository:
Navigate to server folder:
Install dependencies:
Running the Application
Start the server with nodemon (hot-reloading):
nodemon index.js
Alternatively, to run without nodemon:
node index.js
The server will run at http://localhost:5000 (or as specified in .env file).
Database Configuration
Create a .env file in the root of the server directory:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/kanban
Ensure MongoDB is running locally, or provide your cloud database connection string.
Key Dependencies
Express: Web framework
Mongoose: MongoDB ORM
dotenv: Environment variable management
cors: Cross-origin resource sharing
nodemon: Hot-reloading during development
API Endpoints
Define your API routes within the /routes and /controllers folders. Sample endpoints may include:
GET /api/tasks – Fetch all tasks
POST /api/tasks – Create a new task
PUT /api/tasks/:id – Update a task
DELETE /api/tasks/:id – Delete a task
Environment Variables Example
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/kanban
Build & Deployment
For production, you may use pm2 or deploy to platforms like Heroku, Render, or AWS.
License
This project is licensed under the MIT License.
Happy coding! 🚀
npm install
cd kanban-board/server
git clone https://github.com/khambampatibhavyasri/kanban-board.git
has context menu