import PostCard from "@/components/PostCard";
import DeletePostButton from "@/components/DeletePostButton";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import styles from "./page.module.css";
import { getDatabaseUrl } from "@/lib/firebase";

export default async function PostPage({ params }) {
  const { id } = await params;
  const url = `${getDatabaseUrl()}/posts/${id}.json`;
  const response = await fetch(url);
  const post = await response.json();

  // Håndter tilfælde hvor posten ikke findes
  if (!post) {
    notFound();
  }

  // Server Action to handle post deletion
  async function deletePost() {
    "use server"; // Mark as server action - runs on server only
    const response = await fetch(url, {
      method: "DELETE"
    });
    if (response.ok) {
      redirect("/posts");
    }
  }

  return (
    <main className={styles.postPage}>
      <div className={styles.container}>
        <h1>{post.caption}</h1>
        <div className={styles.postCard}>
          <PostCard post={post} />
        </div>
        <div className={styles.btns}>
          <DeletePostButton deleteAction={deletePost} />
          <Link href={`/posts/${id}/update`}>
            <button className={styles.btnUpdate}>Update post</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
