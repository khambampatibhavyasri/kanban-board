MERN Stack Kanban Board - Client Side
This is the Client-Side (Frontend) part of the Kanban Board application built using React as part of the MERN Stack (MongoDB, Express, React, Node.js).
Features
Interactive Kanban Board for task management
React functional components with hooks
State management using React hooks
API integration with backend using Axios
Styled using CSS/Material-UI (optional)
Folder Structure
client/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── styles/
│
└── package.json
Getting Started
Prerequisites
Ensure you have the following installed:
Node.js (v18 or above recommended)
npm or yarn
Installation
Clone the repository:
Navigate to client folder:
Install dependencies:
Running the Application
Start the development server:
npm start
The application will run at http://localhost:3000
Key Dependencies
React: Frontend library
Axios: HTTP client for API requests
React Router DOM: Routing
Material-UI (Optional): UI Components
API Integration
The client interacts with the backend API using Axios for fetching and updating Kanban board data. Ensure your backend is running before making API calls.
Environment Variables
You can configure your API base URL in an .env file:
REACT_APP_API_BASE_URL=http://localhost:5000/api
Build
To create a production build:
npm run build
License
This project is licensed under the MIT License.
Happy coding! 🚀
npm install
cd kanban-board/client
git clone https://github.com/khambampatibhavyasri/kanban-board.git
has context menu
