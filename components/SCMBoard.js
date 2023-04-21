import styles from '../styles/SCMBoard.module.css';
import { Chessboard } from 'react-chessboard';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';

export default function SCMBoard({ fen, moves }) {
  const [game, setGame] = useState(new Chess(fen));
  const [moveSequence, setMoveSequence] = useState(moves.split(' '));
  const [moveNumber, setMoveNumber] = useState(0);

  useEffect(() => {
    if (game && moveNumber === 0) {
      console.log(moveSequence[moveNumber]);
      const currentMove = moveSequence[moveNumber];
      const sourceSquare = currentMove.substring(0,2);
      const targetSquare = currentMove.substring(2);
      const current = moveNumber + 1;
      console.log(current);
      if(current < moveSequence.length) {
        setMoveNumber(current);
      }
      setTimeout(() => {
        makeAMove({from: sourceSquare, to: targetSquare});
      }, 1000);
      
    }
  }, [game, moveSequence, moveNumber]);

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
    const inputMove = sourceSquare + targetSquare;
    const originalMove = moveSequence[moveNumber];
    if (inputMove !== originalMove) {
      return false;
    }
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if ( move == null ) return false;
    const current = moveNumber + 1;
    if(current < moveSequence.length) {
      setMoveNumber(current);
    }
    return true;
  }

  return (
      <div className={ styles.board }>
        <Chessboard position={ game.fen() } onPieceDrop={ onDrop } />
      </div>
  );
}
