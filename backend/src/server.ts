// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoute from "./routes/authRoutes";
// import messageRoute from "./routes/messageRoute";
// import conversationRoute from "./routes/conversationRoute";
// import userRoute from "./routes/userRoutes";

// import dotenv from "dotenv";
// import { app, server } from "./socket/socket";

// dotenv.config(); // Load environment variables


// // Configure CORS
// const whitelist = [
//   "http://localhost:3000",
//   "https://your-production-domain.com",
//   "https://another-allowed-domain.com",
// ];

// const corsOptions: cors.CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true); // Allow requests without an origin
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow cookies and authentication headers
//   optionsSuccessStatus: 200, // Support for legacy browsers
// };

// // Apply CORS **before** routes
// app.use(cors(corsOptions));

// app.use(cookieParser());
// app.use(express.json());

// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     console.log(`${req.method} ${req.url} took ${duration}ms`);
//   });
//   next();
// });

// // Routes
// app.use("/api/auth", authRoute);
// app.use("/api/message", messageRoute);
// app.use("/api/conversation", conversationRoute);
// app.use("/api/user", userRoute);

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes";
import messageRoute from "./routes/messageRoute";
import conversationRoute from "./routes/conversationRoute";
import userRoute from "./routes/userRoutes";

import dotenv from "dotenv";
import { app, server } from "./socket/socket";

dotenv.config(); // Load environment variables

// Configure CORS for all origins
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins
  },
  credentials: true, // Allow cookies and authentication headers
  optionsSuccessStatus: 200, // Support for legacy browsers
};

// Apply CORS **before** routes
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

