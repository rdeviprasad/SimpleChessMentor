import styles from '../styles/SCMBoard.module.css';
import { Chessboard } from "react-chessboard";
import { useState } from 'react';
import { Chess } from 'chess.js';

export default function SCMBoard() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    try {
     const gameCopy = new Chess(game.fen());
     const result = gameCopy.move(move);
     setGame(gameCopy);
     return result;
    } catch(err) {
      console.log(err);
      return null;
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if ( move == null ) return false;
    return true;
  }

  return (
      <div className={ styles.board }>
        <Chessboard position={ game.fen() } onPieceDrop={ onDrop } />
      </div>
  );
}
