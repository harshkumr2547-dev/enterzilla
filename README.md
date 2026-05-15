# 🎬 ENTERZILLA - Advanced Entertainment Platform

A modern, feature-rich entertainment streaming platform built with React, Node.js, Express, and MongoDB.

## ✨ Features

### Frontend
- ✅ **Phone OTP Login** - Secure login via SMS verification (Twilio)
- ✅ **Email Authentication** - Signup with OTP, login with email/password
- ✅ **Live Search** - Real-time video filtering as you type
- ✅ **Advanced Video Player** - Full-length video playback with controls
- ✅ **10 Categories** - Browse videos by category
- ✅ **100+ Videos** - Complete video database across all categories
- ✅ **Watchlist** - Save favorite videos (requires login)
- ✅ **Beautiful UI** - Modern glassmorphism design with animations
- ✅ **Responsive** - Works on desktop, tablet, and mobile

### Backend
- ✅ **Phone OTP Authentication** - SMS verification via Twilio
- ✅ **Email Verification** - Signup with email OTP
- ✅ **Welcome Emails** - Automated emails via Nodemailer
- ✅ **Video API** - RESTful endpoints for video management
- ✅ **Category Filtering** - Get videos by category
- ✅ **Search Functionality** - Search videos by title, genre, description
- ✅ **User Management** - User profiles and watchlists
- ✅ **JWT Authentication** - Secure token-based auth

### Database
- ✅ **100 Videos Seeded** - Pre-populated database
- ✅ **10 Categories** - Action, Comedy, Drama, Horror, Sci-Fi, Romance, Thriller, Animation, Documentary, Adventure
- ✅ **User Collection** - Store user data and preferences
- ✅ **MongoDB** - Scalable NoSQL database

---

## 🚀 Quick Start

### Prerequisites
- Node.js & npm
- MongoDB (local or cloud)
- Gmail account (for OTP emails)
- Twilio account (for SMS OTP)

### Step 1: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit `backend/.env`:

**Gmail Configuration:**
1. Go to https://myaccount.google.com/apppasswords
2. Select Mail → Device
3. Generate app password
4. Add to `.env`:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

**Twilio Configuration:**
1. Go to https://www.twilio.com/console
2. Copy your Account SID and Auth Token
3. Get your trial phone number
4. Add to `.env`:
```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```

**MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/enterzilla
```

### Step 3: Seed Database

```bash
npm run seed
# Output: ✅ Database seeded with 100 videos!
```

### Step 4: Start Backend Server

```bash
npm run dev
# Output: 🎬 ENTERZILLA backend running on http://localhost:5000
```

### Step 5: Frontend Setup (New Terminal)

```bash
npm install
npm run dev
# Open http://localhost:5173
```

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/send-phone-otp` - Send OTP to phone
- `POST /api/auth/verify-phone-otp` - Verify phone OTP & login
- `POST /api/auth/email-signup` - Signup with email
- `POST /api/auth/verify-email-otp` - Verify email & complete signup
- `POST /api/auth/email-login` - Login with email/password

### Videos
- `GET /api/videos/all` - Get all videos
- `GET /api/videos/category/:category` - Get videos by category
- `GET /api/videos/search/:query` - Search videos
- `GET /api/videos/:id` - Get single video
- `GET /api/videos/categories/list` - Get all categories

### Health
- `GET /api/health` - Server health check

---

## 📊 Database Structure

### User Model
```javascript
{
  username: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  isVerified: Boolean,
  watchlist: [VideoId],
  createdAt: Date,
  updatedAt: Date
}
```

### Video Model
```javascript
{
  title: String,
  category: String,
  genre: String,
  year: Number,
  rating: Number,
  duration: Number (seconds),
  description: String,
  videoUrl: String,
  thumbnail: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎬 Videos Database

### 10 Categories with 10 Videos Each

1. **Action** (10 videos)
   - Explosive Chase, Combat Elite, Bullet Storm, Heist Masters, Prison Break, Sword Legacy, Ninja Shadows, Black Ops, Explosion Zone, Final Stand

2. **Comedy** (10 videos)
   - Laugh Out Loud, Office Chaos, Buddy System, Family Reunion, College Days, Holiday Disaster, Love at First Sight, Road Trip, Dating Games, Pet Trouble

3. **Drama** (10 videos)
   - Broken Promises, Life Lessons, Silent Tears, Second Chance, Lost Love, Street Dreams, Family Secrets, Miracle Worker, Forgiveness, New Horizons

4. **Horror** (10 videos)
   - Midnight Terror, Haunted House, Dark Shadows, Curse of the Past, Night Creature, Bloody Night, Possessed, The Fog, Zombie Dawn, Scream Factory

5. **Sci-Fi** (10 videos)
   - Space Odyssey, Time Warp, Cyber Reality, Robot Uprising, Parallel World, Quantum Leap, Alien Contact, Future City, Teleportation, Mars Colony

6. **Romance** (10 videos)
   - Love in Paris, Soulmates, Chance Meeting, Love Letters, Beach Romance, Against All Odds, Reunited, Midnight Kiss, Forever Young, Destiny

7. **Thriller** (10 videos)
   - Murder Mystery, Twisted Plot, Deadly Game, Mind Games, Countdown, Hidden Truth, Alibi, Betrayal, Last Day, Shadow Game

8. **Animation** (10 videos)
   - Magic Quest, Dragon Tales, Underwater World, Sky Kingdom, Monster Friends, Forest Legend, Superhero Squad, Fairy Tale, Robot Friends, Time Travel Kids

9. **Documentary** (10 videos)
   - Nature Wonders, Human Stories, Space Discovery, Ocean Life, Mountain Peaks, Ancient Civilizations, Wildlife Africa, Tech Revolution, Music Legends, Science Explained

10. **Adventure** (10 videos)
    - Jungle Expedition, Desert Quest, Mountain Climb, Island Discovery, River Journey, Treasure Hunt, Lost City, Sky Adventures, Survival Quest, Arctic Expedition

---

## 🔑 Features Breakdown

### Authentication Flow

**Phone OTP Login:**
1. User enters phone number
2. OTP sent via Twilio SMS
3. User enters 6-digit OTP
4. Automatically creates account on first login
5. JWT token returned
6. User logged in

**Email Authentication:**
1. User signs up with email, username, password
2. OTP sent to email via Nodemailer
3. User verifies OTP from email
4. Welcome email sent
5. Account created with verified status
6. User logged in with JWT token

### Video Player
- Full-length video playback
- Controls: Play, Pause, Volume, Fullscreen
- No autodownload
- Smooth streaming

### Search & Filter
- Live search (no button needed)
- Filter by category
- Search across title, genre, description
- Real-time results

---

## 🛠️ Technology Stack

### Frontend
- React 18
- Tailwind CSS
- Vite
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT
- Bcryptjs
- Nodemailer
- Twilio SDK

### Database
- MongoDB (local or Atlas)

---

## 📱 Testing Features

### Phone OTP
1. Login → Phone tab
2. Enter phone: +91XXXXXXXXXX
3. Check SMS for OTP
4. Enter OTP → Logged in

### Email Signup
1. Create Account
2. Enter details
3. Check email for OTP
4. Verify OTP → Logged in + Welcome email

### Live Search
1. Type in search bar
2. See results update in real-time
3. Click to watch

### Video Player
1. Click Watch button
2. Full-length video plays
3. Use player controls
4. Click Close to exit

### Watchlist
1. Must be logged in
2. Click ♥ on video
3. Saves to watchlist
4. View in "My List" section

---

## 🐛 Troubleshooting

### Email OTP not sending?
- Check Gmail app password (16 characters)
- Enable 2FA on Gmail account
- Update .env EMAIL_PASSWORD

### Phone OTP not sending?
- Verify Twilio credentials
- Check phone number format: +1234567890
- Ensure Twilio account has balance

### Videos not loading?
- Run `npm run seed` to populate database
- Check MongoDB is running
- Verify MONGODB_URI in .env

### Can't connect to backend?
- Backend running on port 5000?
- Frontend API_URL correct?
- Check CORS settings

### Login not working?
- JWT_SECRET set in .env?
- MongoDB connected?
- Check browser console for errors

---

## 📦 Project Structure

```
enterzilla/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Video.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── videos.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
├── src/
│   └── App.jsx
├── README.md
└── package.json
```

---

## 🎓 Learning Resources

- MongoDB: https://docs.mongodb.com/
- Express: https://expressjs.com/
- React: https://react.dev/
- Twilio: https://www.twilio.com/docs/
- Nodemailer: https://nodemailer.com/

---

## 📝 License

MIT License - Feel free to use for personal or commercial projects.

---

## 👨‍💻 Author

**Harsh Kumar** (@harshkumr2547-dev)

---

## 🚀 Ready to Launch?

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run seed
npm run dev

# Terminal 2 - Frontend
npm install
npm run dev

# Open http://localhost:5173
```

**Enjoy your advanced entertainment platform! 🎬✨**

For support or issues, check the troubleshooting section or create an issue on GitHub.
