import React, { useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { AuthUserCtx } from "../../context/authUser";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Username's length must be greater than 6!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(6, "Password's length must be greater than 6!")
    .required("Password is required!"),
});

export const Login = () => {
  const { setAuthUser } = useContext(AuthUserCtx);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://10.1.8.202:5000/auth/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          setAuthUser(res.data.user);
          localStorage.setItem("jwt", res.data.jwt);
        });
    },
  });

  const { handleSubmit, handleBlur, handleChange, errors, touched } = formik;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Card.Title>Signing in ....</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
