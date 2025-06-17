import db from "../db.js";

// GET /api/accounts?userId=1
export const getAccounts = async (req, res) => {
    try {
        const { userId } = req.query;
        const { rows } = await db.query(
            "SELECT * FROM accounts WHERE userId = $1",
            [userId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
