import React from "react";
import Comments from "./Comments";
import "./Posts.css";

const Post = ({ id, title }) =>
    <article className="post">
        <h1>{title}</h1>
        <p>Some text</p>
        <Comments postId={id} />
    </article>;

const Posts = ({ data, err }) =>
    <section className="posts">
        {err
            ? <div className="error">An error occurred fetching posts: {err.stack || err.message || err}</div>
            : (data && data.length)
                ? data.map(post => <Post key={post.id} {...post} />)
                : "No posts yet"}
    </section>;

export default Posts;