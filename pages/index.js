import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SCMBoard from '../components/SCMBoard';

export default function Home() {
  return (
    <div className={ styles.body }>
      <Head>
        <title>SimpleChessMentor</title>
      </Head>
      <SCMBoard />
    </div>
  );
}
