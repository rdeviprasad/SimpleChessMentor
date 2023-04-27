import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ChessPuzzle from './chess-puzzle';

export default function Home() {
  return (
    <div className={ styles.body }>
      <Head>
        <title>Chessiest</title>
      </Head>
      <ChessPuzzle />
    </div>
  );
}
