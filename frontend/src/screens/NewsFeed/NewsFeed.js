import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import { Composer } from "./Composer";
import { Post } from "./Post";

const like = (postId) => axios.
  post("http://10.1.8.202:5000/post/${postId}/like", {
    headers: {
      Authorization: "Bearer" + localStorage.getItem("jwt")
    }
  })

export const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.1.8.202:5000/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const onLike = (postId) => {
    axios.
      post("http://10.1.8.202:5000/post/${postId}/like", null, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("jwt")
        }
      })
      .then((res) => {
        setPosts(posts.map(item => {
          if (item.id === res.data._id) {
            return res.data;
          }
          return item;
        }));
      });
  };

  const onComment = (postId, content) => {
    axios.
      post("http://10.1.8.202:5000/post/${postId}/comment", 
      {
        content: content,
      }, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("jwt")
        }
      })
      .then((res) => {
        setPosts(posts.map(item => {
          if (item.id === res.data._id) {
            return res.data;
          }
          return item;
        }));
      });
  };

  return (
    <Container className="mt-5">
      <Composer />
      <hr className="my-5" />
      {posts.map((post) => (
        <Post key={post._id} post={post} onLikeClick={onLike} onComment={onComment} />
      ))}
    </Container>
  );
};
