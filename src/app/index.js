import Head from 'next/head';
import styles from '../styles/Home.module.css'; // Make sure this path is correct based on your setup

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Checklist dApp</title>
        <meta name="description" content="Decentralized Task Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to your dApp Checklist
        </h1>

        <p className={styles.description}>
          Get started by adding tasks
        </p>

        {/* Task input area */}
        <div>
          <input type="text" placeholder="Enter a new task" />
          <button>Add Task</button>
        </div>

        {/* Task list display */}
        <ul>
          {/* Example Task */}
          <li>Example task</li>
        </ul>
      </main>
    </div>
  );
}
