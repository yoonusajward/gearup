# GearUp - Online Tech Store

GearUp is an online tech store application that allows users to browse and purchase tech products. The project is built with a full-stack architecture consisting of a React frontend and an Express.js backend, with a MySQL database for data storage.

## Features
- **User Management**: Users can enter their details and start shopping.
- **Product Management**: Display products from the database, allow users to view product details, add items to their cart, update quantities, and remove products.
- **Cart Management**: Users can manage their cart, view added items, and update quantities.
- **Order Management**: Users can confirm their order by providing delivery details, and receive an order confirmation email upon successful purchase.
- **Responsive Design**: The frontend is designed to be responsive, ensuring a seamless user experience across devices.

## Technologies Used
- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Email Notifications**: Nodemailer (for order confirmation emails)
- **API**: RESTful API for product and cart management

## Setup Instructions

### Prerequisites
- **Node.js** and **npm** should be installed on your machine. If you don't have them installed, you can download and install them from [Node.js](https://nodejs.org/).
- **MySQL** should be installed and running.

### 1. Clone the repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/yoonusajward/gearup.git
cd gearup

```
### 2. Setup Backend

#### a. Install dependencies
Navigate to the backend directory and install the necessary dependencies:

```bash
cd backend
npm install
```

### 2.  Setup Frontend

#### a. Install dependencies
Navigate to the frontend directory and install the necessary dependencies:

```bash
cd frontend
npm install
npm start

```
The frontend will be available at http://localhost:3000.
