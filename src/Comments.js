import React, { useContext } from "react";
import AppStore from "./AppStore";
import "./Comments.css";

const Comment = ({ body }) => <p className="comment">{body}</p>;

const Comments = ({ postId }) => {

    const { comments } = useContext(AppStore);
    const { data, err } = comments;
    if (err ) {

        return <div className="error">An error occurred fetching Comments: {err.stack || err.message || err}</div>;

    } else {

        const postComments = data && data.filter(comment => comment.postId === postId);
        return ( postComments && postComments.length)
            ? postComments.map(comment => <Comment key={comment.id} {...comment} />)
            : "No comments yet";

    }

}

export default Comments;