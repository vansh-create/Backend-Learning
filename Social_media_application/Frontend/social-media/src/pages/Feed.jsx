import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPost] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/feed");

      console.log("API response:", response.data.data);

      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div style={styles.page}>
      <main style={styles.feed}>
        {posts.map((post) => (
          <article key={post._id} style={styles.post}>
            <img
              src={post.img}
              alt={post.caption}
              style={styles.image}
            />

            <div style={styles.caption}>
              {post.caption}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },

  feed: {
    width: "500px",
    maxWidth: "95%",
    margin: "25px auto",
  },

  post: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginBottom: "25px",
    overflow: "hidden",
    border: "1px solid #ddd",
  },

  image: {
    width: "100%",
    display: "block",
    maxHeight: "600px",
    objectFit: "cover",
  },

  caption: {
    padding: "12px 15px",
    fontSize: "15px",
  },
};

export default Feed;
