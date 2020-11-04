import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Username's length must be greater than 6!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(6, "Password's length must be greater than 6!")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Confirm password not matched")
    .required("Confirm password is required!"),
});

export const Register = () => {
  const [registering, setRegistering] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setRegistering(true);
      axios
        .post("http://10.1.8.202:5000/auth/register", {
          username: values.username,
          password: values.password,
        })
        .then(() => {
          setSuccess(true);
          setError(false);
        })
        .catch(() => {
          setError(true);
          setSuccess(false);
        })
        .finally(() => {
          setRegistering(false);
        });
    },
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          {!registering && isSuccess ? (
            <Alert variant="success">Registered Successfully!</Alert>
          ) : null}
          {!registering && isError ? (
            <Alert variant="danger">Something went wrong!</Alert>
          ) : null}
          <Card.Title>
            Please fill out the form to create an account ....
          </Card.Title>
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
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={registering}>
              {registering ? "Registering ..." : "Register"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
