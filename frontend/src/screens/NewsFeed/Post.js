import React, { useContext, useState } from "react";
import { Button, Card, FormControl } from "react-bootstrap";
import dayjs from 'dayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { AuthUserCtx } from "../../context/authUser"
import { faThumbsUp as fasThumbsUp } from "@fortawesome/free-solid-svg-icons";
import style from "./post.module.css";

export const Post = ({ post, onLikeClick, onComment }) => {
  const { authUser } = useContext(AuthUserCtx);
  const [showComments, setShowComments] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const hasLiked = post.likes
    ? post.likes.some((likesUserId) => likesUserId === authUser._id)
    : false;
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex">
        <img
          src={post.author.photoURL}
          alt=""
          style={{ width: 50, height: 50 }}
          className="border rounded-circle mr-2"
        />
        <div>
          <h6>{post.author.displayName || post.author.username}</h6>
          <small>{dayjs(post.createdAt).format("DD-MM-YYYY HH:mm")}</small>
        </div>
      </Card.Header>
      <Card.Body
        className="p-5 text-center"
        style={{
          backgroundImage: `url(${post.image})`,
          fontSize: 36,
          textShadow: "1px 1px 2px white, 0 0 25px #007bff, 0 0 5px white",
        }}
      >
        {post.content}
      </Card.Body>
      <div class="d-flex">
        <div className={style.iconButton} onClick={onLikeClick}>
          <FontAwesomeIcon icon={hasLiked ? fasThumbsUp : faThumbsUp} color={hasLiked ? "#007bff" : "#ececec"} />
          <span>{post.likes ? post.likes.length : 0}</span>
        </div>
        <div className={style.iconButton} onClick={() => {
          setShowComments(!showComments);
        }}>
          <FontAwesomeIcon icon={faComment} />
          <span>10</span>
        </div>
      </div>
      <div>
        {
          post.comments.map((item) => {
            <Comment key={item._id} comment={item} />
          })
        }
      </div>
      {
        showComments ? (
          <div className="d-flex">
            <FormControl 
            type="text" 
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="flex-grow-1 mr-2" 
            placeholder="Leave ur comment here..." />
            <Button variant="primary" onClick={() => {
              onComment(post._id, inputValue),
              setInputValue("");
            }}>Post</Button>
          </div>
        ) : null
      }
    </Card>
  );
};

const Comment = ({ comment }) => {
  return (
    <div className="d-flex">
      <img src={comment.user.photoURL} 
      alt=""
      style={{ width: 40, height: 40 }}
      className="border rounded-circle mr-2" />
      <div>
        <h4>{comment.displayName}</h4>
      </div>
    </div>
  )
}
