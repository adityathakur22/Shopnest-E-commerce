# ShopNest Deployment

ShopNest is deployed as one Node service. The backend serves the React production build when `NODE_ENV=production`.

## Build and Start

Use these commands from the repository root:

```sh
npm install
npm run build
npm start
```

For platforms such as Render, Railway, or a VPS:

```sh
Build command: npm install && npm run build
Start command: npm start
```

The app expects Node.js 20 or newer.

## Environment Variables

Set these variables in your deployment provider:

```sh
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/shopnest
JWT_SECRET=replace_with_a_long_random_secret
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

`backend/.env.example` contains the same list for local setup.

## Health Check

After deployment, check:

```sh
GET /api/health
```

Expected response:

```json
{ "status": "ok", "service": "shopnest-api" }
```
