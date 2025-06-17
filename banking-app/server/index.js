import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import accountRoutes from "./routes/accounts.js";
import transactionRoutes from "./routes/transactions.js";
import transferRoutes from "./routes/transfers.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/transfers", transferRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
