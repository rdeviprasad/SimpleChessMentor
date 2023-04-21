import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Puzzle from './puzzle';

export default function Home() {
  return (
    <div className={ styles.body }>
      <Head>
        <title>SimpleChessMentor</title>
      </Head>
      <Puzzle />
    </div>
  );
}
