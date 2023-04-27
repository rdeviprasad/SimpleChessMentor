import { useState, useEffect } from 'react';
import Board from '../components/Board';
import axios from 'axios';

const ChessPuzzle = () => {
  const [fen, setFen] = useState(null);
  const [moves, setMoves] = useState(null);

  useEffect(() => {
    const getPuzzle = async () => {
      try {
        const res = await axios.get('api/puzzle');
        setFen(res.data.FEN);
        setMoves(res.data.Moves);
      } catch (error) {
        console.error(error);
      }
    };

    getPuzzle();
  }, []);

  if (fen === null || moves === null) {
    return <div>Loading...</div>;
  }

  return (
    <Board fen={fen} moveSeq={moves} />
  );
};

export default ChessPuzzle;
