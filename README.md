# Home Shopping Website 

This project is a home shopping website developed using Prisma, PostgreSQL, TypeScript, Redux Toolkit, and Redux Saga.

### Installing

```
git clone https://github.com/Anna0345/homeshopping-backend.git
npm install

```

## Getting Started

To test the application

* Install PostgreSQL from https://www.postgresql.org/download/
* Create your free shared database and choose a username and password for it
* Copy it and place in in your .env file
* Example
  - DATABASE_URL=postgres://yourUserName:yourPassword@localhost:5432/yourDatabase for schema.prisma
  - SECRET_KEY=randomGeneratedKey
   - SESSION_SECRET=randomSecret




## Project Structure

- Controllers
  - addressController
  - authController
  - orderController
  - paymentController
  - productController
  - shoppingCartController
- Services
  - addressService
  - authService
  - orderService
  - paymentService
  - productService
  - shoppingService
- Routes
  - addressRoutes
  - authRoutes
  - orderRoutes
  - paymentRoutes
  - productRoutes
  - shoppingRoutes

## Functionalities

- JWT authentication and authorization
- User registration and login
- Shopping cart implementation for registered users 
- CRUD operations for products,addresses and etc.
- Seeding via Prisma

## Development

### Prisma

To migrate the Prisma schema, use the following command:
npx prisma migrate dev --name [any name you want]

To generate the Prisma client, run:
prisma generate

To seed the database, use:
npm run seed 

### Running the project

To run the project in development mode, use:
npm run dev


### Testing

To test the login functionality, use Postman with the following details:

URL: `http://localhost:3000/auth/login`

Body:
```json
{
    "email": "annaS@gmail.com",
    "password": "Password1#"
}
```

### Frontend

### Installing

```
git clone https://github.com/Anna0345/homeshopping-website.git
npm install

```

## Project Structure

- Auth (with api, saga and slice)
- Cart (with api,saga and slice)
- Products (with api,saga and slice)

## Functionalities

- User registration and login
- Guest and user cart (guests use localStorage and registered users use the database)
- Development
- Styles

## Development
The project uses :

 - Redux Toolkit
 - Redux Saga
 - Typescript
 - Ant Design
 - CSS

## Running the project
To run the frontend in development mode, use the following command:
npm run dev
