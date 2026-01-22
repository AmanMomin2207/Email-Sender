// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import session from 'express-session';
// import passport from 'passport';
// import { json } from 'body-parser';
// // Routes
// import authRoutes from './routes/auth';
// import apiRoutes from './routes/api';
// // Worker
// import './worker/emailWorker';
// import { startRedisServer } from './config/initRedis';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Start Redis and then App
// startRedisServer().then(() => {
//     // We can't easily wait for this in the top-level exports of other files, 
//     // but configuring the server here ensures the process is ready.
// });

// app.use(cors({
//     origin: process.env.CLIENT_URL!,
//     credentials: true
// }));
// app.use(json());

// // Session config
// app.use(session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // Set to true if using HTTPS
//         maxAge: 24 * 60 * 60 * 1000,
//         sameSite: "none"
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//     res.send('Email Scheduler API is running');
//     res.redirect(process.env.CLIENT_URL!);
// });

// app.use('/api/auth', authRoutes);
// app.use('/api', apiRoutes);

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { json } from 'body-parser';

// Routes
import authRoutes from './routes/auth';
import apiRoutes from './routes/api';

// Worker
import './worker/emailWorker';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(json());

// Session (REQUIRED for Google OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // ✅ HTTPS
    sameSite: "none",    // ✅ cross-domain
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Health check
app.get('/', (req, res) => {
  res.send('Email Scheduler API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
