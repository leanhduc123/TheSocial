import React from "react";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import style from "./composer.module.css";

const images = [
  "https://www.freecodecamp.org/news/content/images/2020/04/w-qjCHPZbeXCQ-unsplash.jpg",
  "https://blog.prezi.com/wp-content/uploads/2019/03/jason-leung-479251-unsplash.jpg",
  "https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg",
];

export const Composer = () => {
  const [selectedImg, setSelectedImg] = useState();
  const [content, setContent] = useState("");

  const createPost = () => {
    axios.post(
      "http://10.1.8.202:5000/post",
      {
        image: selectedImg,
        content: content,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>What are you thinking?</Card.Title>
        <Form.Control
          as="textarea"
          rows="3"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          style={{ backgroundImage: `url(${selectedImg})` }}
          className={style.composer}
        />
        <div className="d-flex justify-content-between mt-2">
          <div>
            {images.map((item) => (
              <img
                src={item}
                key={item}
                alt=""
                className="rounded-circle m-1"
                style={{
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  border: item === selectedImg ? "2px solid #007bff" : null,
                }}
                onClick={() => {
                  setSelectedImg(item);
                }}
              />
            ))}
          </div>
          <Button variant="primary" onClick={createPost}>
            Post
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
