### Sample backend for testing payment integration

This Node.js backend server uses Express, MongoDB and Mongoose to provide a simple API for testing payment integration.
T
The server provides the following endpoints -

- POST: /api/v1/signin (Sign in a user)
- POST: /api/v1/signup (Sign up a user)
- GET: /api/v1/profile (Get user profile)
- GET: /api/v1/check-subscription (Check subscription status)
- POST: /api/v1/order (Create an order)
- POST: /api/v1/orders (Get all orders)
- PATCH: /api/v1/refund (Refund an order)
- GET: /api/v1/products (Get all products)
- GET: /api/v1/coupons (Get all coupons)

The server uses JWT for authorization (Authorization: Bearer `token`) in headers for all endpoints except these endpoints -

- /api/v1/signin
- /api/v1/signup
- /api/v1/products
- /api/v1/coupons

### Setup payment integration

Stripe | Razorpay | PhonePe | Paytm are to be used for payment integration. It's not implemented yet.

A payment gateway that should support -

- Card payments
- UPI payments
- International transactions
- Transactions within India
- Subscription
- One-time payment
- Easy to integrate
- Good documentation

### Setup application

- Clone the repository
- Run `npm install` to install dependencies
- Create a `.env` file in the root directory and add the following environment variables -

  ```
  PORT=3000
  MONGO_URI=mongodb://localhost:27017/payment-integration
  JWT_SECRET=secret
  STRIPE_SECRET_KEY=your_stripe_secret_key
  BCRYPT_SALT_ROUNDS=10
  JWT_EXPIRES_IN=1h
  DATABASE_NAME=MongoDB
  NODE_ENV=development
  ```

- Run `npm start` to start the server
- The server will start on `http://localhost:3000`

### Live demo

The backend is deployed on Render (free) - [https://ecom-server-gzxu.onrender.com](https://ecom-server-gzxu.onrender.com)
