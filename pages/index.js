import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/header';
import AtttiudeContainer from "../components/attitude-container";
import { getAllAttitudes } from "../lib/api";

export default function Home({ attitudes }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid Beliefs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="COVID Beliefs" />
      <main>
        {attitudes.map((attitude) => (
          <AtttiudeContainer
            key={attitude._id}
            title={attitude.title}
            slug={attitude.slug}
            description={attitude.descriptionHtml}
          />
        ))}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const attitudes = await getAllAttitudes();
  return {
    props: {
      attitudes,
    },
  };
}