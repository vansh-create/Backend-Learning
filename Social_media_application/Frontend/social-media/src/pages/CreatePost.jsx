import { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("img", image);
      formData.append("caption", caption);

      const response = await axios.post(
        "http://localhost:3000/create-post",
        formData
      );

      console.log("Post created:", response.data);

      alert("Post created!");

      // Clear form
      setImage(null);
      setPreview(null);
      setCaption("");
    } catch (error) {
      console.error("Error creating post:", error);

      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Create Post</h2>

        <form onSubmit={handleSubmit}>
          <label style={styles.uploadBox}>
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={styles.preview}
              />
            ) : (
              <div>
                <p>📷</p>
                <span>Click to upload an image</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>

          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={styles.textarea}
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },

  card: {
    width: "400px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  uploadBox: {
    height: "300px",
    border: "2px dashed #ccc",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    overflow: "hidden",
  },

  preview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  textarea: {
    width: "100%",
    height: "100px",
    marginTop: "15px",
    padding: "12px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    resize: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#1877f2",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default CreatePost;