# LAGHATA

The Laghata app serves as a marketplace connecting individuals eager to rent out their equipment for various activities and adventures. Whether you're seeking gear for outdoor pursuits or thrilling experiences, our platform facilitates seamless connections between equipment owners and those in need of rentals.

## Instalation
## Laghata Marketplace Setup Guide

This guide will walk you through the steps to set up and run the Laghata Marketplace project.

## Clone the Repository

```
git clone https://github.com/Aymen-Gherdaine/laghata-marketplace.git
cd laghata-marketplace
```

## Frontend Setup
Navigate to the Frontend Folder

```
cd frontend
```
### Install Dependencies
```
npm install
```

## Create .env File
Create a .env file in the frontend folder and add the following configuration:

#### .env
```
REACT_APP_SERVER_PORT=your_frontend_port
CLOUDINARY_URL=your_cloudinary_url
```

Replace your_frontend_port and your_cloudinary_url with your desired values.

### Start the Frontend
```
npm start
```

### Backend Setup
Navigate to the Backend Folder
```
cd ../backend
```
Install Dependencies

```
npm install
```

Create .env File
Create a .env file in the backend folder and add the following configuration:

#### .env
```
MONGO_URI=your_mongodb_uri
PORT=your_backend_port
CLIENT_PORT=your_frontend_port
JWT_SECRET=your_jwt_secret
```
Replace your_mongodb_uri, your_backend_port, your_frontend_port, and your_jwt_secret with your actual configuration.

#### Start the Backend

```
npm start
```
Now, both the frontend and backend of the Laghata Marketplace should be up and running.

Visit your frontend application at ***http://localhost:your_frontend_port*** and start exploring!

Feel free to customize the configurations and enjoy using the Laghata Marketplace.

Make sure to replace the placeholder values with your actual configurations. If you encounter any issues during the setup, check the terminal output for error messages or refer to the project documentation for troubleshooting.




