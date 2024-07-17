### Sample backend for testing payment integration

This Node.js backend server uses Express, MongoDB and Mongoose to provide a simple API for testing payment integration.

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

The server uses JWT for authorization (Authorization: Bearer <token>) in headers for all endpoints except these endpoints -

- /api/v1/signin
- /api/v1/signup
- /api/v1/products
- /api/v1/coupons

Stripe | Razorpay | PhonePe | Paytm are to be used for payment integration.
