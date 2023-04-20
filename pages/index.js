import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Chessboard } from "react-chessboard";

export default function Home() {
  return (
    <div className={ styles.body }>
      <Head>
        <title>SimpleChessMentor</title>
      </Head>
      <div className={ styles.board }>
        <Chessboard id="BasicBoard" />
      </div>
    </div>
  )
}
