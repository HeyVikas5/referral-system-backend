# 🧾 Referral System Backend

A two-level referral system built with **Node.js**, **Express**, and **MongoDB**. Users can sign up with referral codes, make purchases, and earn commissions through their referral tree.

## 🚀 Live Demo

**Frontend + Backend Deployed Together**:  
🌐 [https://referral-system-backend-m0w9.onrender.com](https://referral-system-backend-m0w9.onrender.com)

> All features (signup, purchase, earnings) work from one single UI.

---

## 📌 Features

- 👤 User Signup with unique referral code
- 🌱 2-level referral hierarchy system
- 💸 Earnings distribution on purchase:
  - 10% to Level 1 referrer
  - 5% to Level 2 referrer
- 💰 Real-time earnings dashboard
- 🔐 MongoDB for persistent user, earnings & purchase data

---

## 📁 Folder Structure

```
referral-system-backend/
├── controllers/
├── models/
├── routes/
├── public/
│   └── signup.html (includes all forms)
├── server.js
├── app.js
├── .env
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Frontend**: HTML, Bootstrap, JS (in `/public/signup.html`)
- **Deployment**: Render

---

## 🔄 API Endpoints

### 1. **User Signup**
`POST /api/users/signup`
```json
{
  "name": "Vikas",
  "email": "vikas@example.com",
  "referredBy": "ABC123" // optional
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "referralCode": "XYZ456",
  "level": 1,
  "userId": "mongo_id"
}
```

### 2. **Make a Purchase**
`POST /api/purchase/make`
```json
{
  "userId": "mongo_id",
  "amount": 1500
}
```

### 3. **Check Earnings**
`GET /api/earnings/:userId`

**Response:**
```json
{
  "totalEarnings": 225,
  "level1Earnings": 150,
  "level2Earnings": 75,
  "breakdown": [
    { "fromUser": "Ashish", "level": 1, "earned": 150 },
    { "fromUser": "Ravi", "level": 2, "earned": 75 }
  ]
}
```

---

## 📊 Data Models

### 🧍 User
```js
{
  name, email, referralCode, referredBy, level,
  referredUsers: [ObjectId]
}
```

### 💸 Purchase
```js
{
  userId, amount, timestamp
}
```

### 💰 Earnings
```js
{
  userId, totalEarnings, level1Earnings, level2Earnings,
  transactions: [ { fromUser, level, earned } ]
}
```

---

## 👀 Screenshots
> Visit [Live Demo](https://referral-system-backend-m0w9.onrender.com) to see it in action!

---

## 🙌 Author
**Vikas**  
Email: [heyvikas5@gmail.com](mailto:heyvikas5@gmail.com)

---

## 💡 Future Enhancements
- Add JWT Authentication
- React Frontend for better UX
- Admin panel to monitor referrals
