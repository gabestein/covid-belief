// components/post-container.js
import styles from "../styles/AttitudeContainer.module.css";
import Link from "next/link";

export default function AttitudeContainer({ title, description, slug }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Link href={`/attitude/${slug}`}>{title}</Link>{" "}
      </div>
      <div dangerouslySetInnerHTML={{__html: description}} />
    </div>
  );
}