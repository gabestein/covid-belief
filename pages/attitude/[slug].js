// pages/blog/[slug].js
import Head from "next/head";
import Link from "next/link";
import styles from "..//../styles/Attitude.module.css";
import { getAllAttitudeSlugs, getAttitudeBySlug } from "../../lib/api";
import Header from "../../components/header";

function Attitudes({ attitude }) {
  return (
    <div>
      <Head>
        <title key={attitude.title}>{attitude.title}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header title={attitude.title} />
          <h2 className={styles.home}>
            <Link href={`/`}>🏠 Home</Link>
          </h2>
        </div>
        <div className={styles.info} dangerouslySetInnerHTML={{ __html: attitude.descriptionHtml }} />
        <div className={styles.body}>
          {" "}
          <main dangerouslySetInnerHTML={{ __html: attitude.detailsHtml }} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const allAttitudes = await getAllAttitudeSlugs();
  const paths = allAttitudes.map((attitude) => ({
    params: { slug: attitude.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const attitude = await getAttitudeBySlug(params.slug);

  return {
    props: {
      attitude,
    },
  };
}

export default Attitudes;