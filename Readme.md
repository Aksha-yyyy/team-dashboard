# 🧑‍💻 Team Member Dashboard

A modern React-based web dashboard to manage team members and their tasks. This application allows you to add, edit, delete team members, and track task completion with an intuitive interface.

## 🚀 Features

- Add new team members with roles and tasks
- Edit existing team members
- Delete members with confirmation
- Toggle task completion status
- Smooth and responsive user interface
- Modular component structure using React

## 📁 Project Structure

src/
├── assets/ # For images or static assets (optional)
├── components/ # React components
│ ├── Dashboard.jsx
│ ├── MemberCard.jsx
│ ├── MemberForm.jsx
│ └── Modal.jsx # (Ensure this file exists)
├── Style/ # All CSS files
│ ├── Dashboard.css
│ ├── MemberCard.css
│ ├── MemberForm.css
│ ├── Modal.css
│ ├── global.css
│ └── variable.css
├── App.jsx
├── App.css
├── index.css
├── main.jsx



> 🔧 Note: The component `MemberList.jsx` was originally referenced but is not present. Instead, the `Dashboard.jsx` file renders `MemberCard` components directly.

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/team-member-dashboard.git
cd team-member-dashboard/frontend
npm install
npm run dev
Your app will be running at: http://localhost:5173

📜 License
This project is open source and available under the MIT License.

