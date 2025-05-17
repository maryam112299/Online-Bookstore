# Online-Bookstore

A full-stack web application for managing books and user profiles with authentication.

## Features

- User authentication (Signup/Login)
- Profile management
- Book listing with details
- Add/Delete books
- Animated page transitions
- Responsive design

## Technologies Used

### Frontend
- React.js
- React Router
- Formik (for form handling)
- Yup (for form validation)
- Framer Motion (for animations)
- Axios (for HTTP requests)
- Bootstrap (for styling)

### Backend
- Node.js
- Express.js
- MySQL (database)
- Bcrypt (for password hashing)
- CORS (for cross-origin requests)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL server
- npm or yarn

### Backend Setup
1. Navigate to the backend directory: ```cd backend```
 
   
Install dependencies:
```npm install```
Create a .env file with the following variables:
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=yourpassword
- DB_NAME=bookstore
- PORT=8081

Set up your MySQL database with these tables:

```CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profilePicture VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


```
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  stock INT DEFAULT 0,
  rate DECIMAL(3,1) DEFAULT 0,
  category VARCHAR(50),
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


```
Start the server:
```npm start```

Frontend Setup:
Navigate to the frontend directory:
```cd frontend```

Install dependencies:
```npm install```

Project Structure:
```
bookstore/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── AddBookForm.js
│   │   │   │   ├── BookCard.js
│   │   │   │   ├── BookDetails.js
│   │   │   │   ├── BooksList.js
│   │   │   │   ├── Dashboard.js
│   │   │   │   └── Dashboard.css
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── TextField.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

![image](https://github.com/user-attachments/assets/99648c2c-d981-4f3e-9ac7-5b01d471025e)

![image](https://github.com/user-attachments/assets/5b782b86-46b8-4312-9e1d-5c42a85a161d)

![image](https://github.com/user-attachments/assets/02b51fb1-0782-42d6-86a6-fad25f41637c)

![image](https://github.com/user-attachments/assets/b91682c0-9ca8-4fda-943d-dcab4797bfe5)

![image](https://github.com/user-attachments/assets/60fd95b9-6912-4403-a4d2-0201e6479d46)

![image](https://github.com/user-attachments/assets/4ec5644f-1a66-449e-8ea0-2ab3371d19bb)


![image](https://github.com/user-attachments/assets/4721a35f-637f-4280-bb0e-f2bbe1aeb9c4)




