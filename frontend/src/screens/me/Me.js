import React, { useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

import { AuthUserCtx } from "../../context/authUser";

const defaultImg =
  "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg";

export const Me = () => {
  const { authUser, setAuthUser } = useContext(AuthUserCtx);

  const formik = useFormik({
    initialValues: {
      displayName: authUser.displayName,
      address: authUser.address,
    },
    onSubmit: (values) => {
      const jwt = localStorage.getItem("jwt");
      axios
        .put("http://10.1.8.202:5000/auth/me", values, {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        })
        .then((res) => {
          setAuthUser(res.data);
        });
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  const uploadPhoto = (file) => {
    const formData = new FormData();
    formData.append("photo", file);
    axios
      .post("http://10.1.8.202:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const newPhotoURL = `http://10.1.8.202:5000/static/${res.data.fileName}`;
        axios
          .put(
            "http://10.1.8.202:5000/auth/me",
            {
              photoURL: newPhotoURL,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            setAuthUser(res.data);
          });
      });
  };

  return (
    <Container className="mt-5">
      <h1>Configurations for {authUser.username}</h1>
      <div className="d-flex align-items-center my-3 flex-column">
        <img
          src={authUser.photoURL || defaultImg}
          alt="avatar"
          style={{ width: 150 }}
          className="border rounded-circle"
        />
        <Form.File
          custom
          label="Select ..."
          style={{ maxWidth: 350 }}
          className="mt-2"
          onChange={(e) => {
            uploadPhoto(e.target.files[0]);
          }}
        />
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDisplayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Display Name"
            name="displayName"
            value={values.displayName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            name="address"
            value={values.address}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
};
