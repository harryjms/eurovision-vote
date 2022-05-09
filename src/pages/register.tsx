import { useFormik } from "formik";
import Textfield from "../component/Textfield";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

const Register = () => {
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      email: Yup.string()
        .email("Email does not appear to be valid")
        .required("You must enter an email"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().test(
        "matches-password",
        (value, context) => {
          if (value === "") return true;
          if (value === context.parent.password) return true;
          return context.createError({ message: "Passwords must match" });
        }
      ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setResponseStatus(null);
        const res = await axios.post("/api/user", {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        setResponseStatus(res.status);
      } catch (err) {
        console.error(err);
        setResponseStatus(err.response.status);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <>
      <Head>
        <title>Register | Eurovision You Decide</title>
      </Head>
      <main className="max-w-md mx-auto">
        <h1>Register</h1>
        {!responseStatus || responseStatus !== 200 ? (
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <Textfield
              type="text"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
              disabled={loading}
            />
            <Textfield
              type="email"
              label="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              disabled={loading}
            />
            <div className="flex gap-2 w-full">
              <Textfield
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                disabled={loading}
                fullWidth
              />
              <Textfield
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                disabled={loading}
                fullWidth
              />
            </div>
            {responseStatus !== null ? (
              <div className="text-red-500 font-bold p-2 text-center">
                Something went wrong
              </div>
            ) : null}
            <button type="submit" disabled={loading}>
              Register
            </button>
          </form>
        ) : (
          <b>Registration successful</b>
        )}
      </main>
    </>
  );
};

export default Register;
