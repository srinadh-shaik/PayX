import db from "../db.js";

// POST /api/transfers
export const createTransfer = async (req, res) => {
    const client = await db.connect();
    try {
        const { fromAccountId, toAccountId, amount, description } = req.body;

        await client.query("BEGIN");

        // 1) Debit from source
        await client.query(
            "UPDATE accounts SET balance = balance - $1 WHERE id = $2",
            [amount, fromAccountId]
        );

        // 2) Credit to destination
        await client.query(
            "UPDATE accounts SET balance = balance + $1 WHERE id = $2",
            [amount, toAccountId]
        );

        // 3) Insert transfer record
        await client.query(
            `INSERT INTO transfers (fromAccountId, toAccountId, amount, description, status, transferDate)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
            [fromAccountId, toAccountId, amount, description || "", "completed"]
        );

        await client.query("COMMIT");
        res.json({ success: true });
    } catch (err) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};
