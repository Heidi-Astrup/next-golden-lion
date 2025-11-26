import PostCard from "@/components/PostCard";
import Link from "next/link";
import styles from "./page.module.css";
import { getDatabaseUrl } from "@/lib/firebase";

// Server Component
export default async function Home() {
  const url = `${getDatabaseUrl()}/posts.json`;
  const response = await fetch(url);
  const dataObject = await response.json();

  const posts = Object.keys(dataObject || {}).map(key => ({
    id: key,
    ...dataObject[key]
  })); // Convert object to array

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.grid}>
          {posts.map(post => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <PostCard post={post} />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
