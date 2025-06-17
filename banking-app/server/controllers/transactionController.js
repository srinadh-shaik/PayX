import db from "../db.js";

// GET /api/transactions?accountId=1
export const getTransactions = async (req, res) => {
    try {
        const { accountId } = req.query;
        const { rows } = await db.query(
            "SELECT * FROM transactions WHERE accountId = $1 ORDER BY id DESC",
            [accountId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
