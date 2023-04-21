export default async function handler(req, res) {
    if (req.method === "POST") {
      const { fen, moves } = req.body;
      res.status(200).json({ fen, moves });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  