import { useState } from "react";
import { useRouter } from "next/router";

export default function Puzzle() {
  const [fen, setFen] = useState("");
  const [moves, setMoves] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fen, moves }),
    });

    if (response.ok) {
      const result = await response.json();
      router.push({
        pathname: "/result",
        query: { fen: result.fen, moves: result.moves },
      });
    }
  };

  return (
    <div>
      <h1>Input Form</h1>
      <form onSubmit={ handleSubmit }>
        <label>
          FEN:
          <input
            type="text"
            value={fen}
            onChange={(e) => setFen(e.target.value)}
          />
        </label>
        <label>
          Moves:
          <input
            type="text"
            value={moves}
            onChange={(e) => setMoves(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
