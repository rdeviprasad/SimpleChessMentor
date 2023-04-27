import styles from '../styles/Board.module.css';
import { Chessboard } from 'react-chessboard';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';

export default function Board({ fen, moveSeq }) {
  const [game, setGame] = useState(new Chess(fen));
  const [moveSequence, setMoveSequence] = useState(moveSeq?.split(' ') ?? []);
  const [moveNumber, setMoveNumber] = useState(0);
  const [moveFrom, setMoveFrom] = useState('');

  function incrementMoveNumber() {
    const nextMoveNumber = moveNumber + 1;
    if (nextMoveNumber <= moveSequence.length) {
      setMoveNumber(nextMoveNumber);
    }
  }

  useEffect(() => {
    if (moveNumber % 2 === 0 && moveNumber < moveSequence.length) {
      systemMove(moveNumber);
    }
  }, [game, moveSequence, moveNumber]);

  function makeAMove(move) {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      if (!result) {
        console.log('Invalid move:', move);
        return null;
      }
      setGame(gameCopy);
      return result;
    } catch (err) {
      console.error('Error in makeAMove:', err);
      return null;
    }
  }

  function validMove(sourceSquare, targetSquare) {
    const inputMove = sourceSquare + targetSquare;
    const originalMove = moveSequence[moveNumber];
    return inputMove === originalMove;
  }

  function systemMove(currentMoveNumber) {
    if (currentMoveNumber < moveSequence.length) {
      const currentMove = moveSequence[currentMoveNumber];
      const sourceSquare = currentMove.substring(0, 2);
      const targetSquare = currentMove.substring(2);
      setTimeout(() => {
        makeAMove({ from: sourceSquare, to: targetSquare });
        incrementMoveNumber();
      }, 1000);
    }
  }

  function executeMoveAndAdvance(sourceSquare, targetSquare) {
    if (moveNumber >= moveSequence.length) return false;
    if (!validMove(sourceSquare, targetSquare)) return false;
  
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
  
    if (move === null) return false;
    incrementMoveNumber();
    return true;
  }
  
  function onDrop(sourceSquare, targetSquare) {
    return executeMoveAndAdvance(sourceSquare, targetSquare);
  }
  
  function onSquareClick(square) {
    if (moveNumber >= moveSequence.length) return;
  
    if (!moveFrom) {
      setMoveFrom(square);
      return;
    }
  
    if (executeMoveAndAdvance(moveFrom, square)) {
      setMoveFrom('');
    } else {
      setMoveFrom(square);
    }
  }
  
  return (
    <div className={styles.board}>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        customDarkSquareStyle={{ backgroundColor: '#af737f' }}
        customLightSquareStyle={{ backgroundColor: '#f0e8e4' }}
      />
    </div>
  );
}
