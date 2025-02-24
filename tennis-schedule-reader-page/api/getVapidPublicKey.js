export async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const publicKey = process.env.VAPID_PUBLIC_KEY; // ✅ Fetch from backend env
        res.status(200).json({ publicKey });
    } catch (error) {
        console.error("❌ Error fetching VAPID public key:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}