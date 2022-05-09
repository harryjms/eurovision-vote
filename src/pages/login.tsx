import { useFormik } from "formik";
import Head from "next/head";
import { useState } from "react";
import Textfield from "../component/Textfield";
import axios from "axios";
import { useRouter } from "next/router";
const PageLogin = () => {
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setResponseStatus(null);
        const res = await axios.post("/api/login", {
          email: values.email,
          password: values.password,
        });
        setResponseStatus(res.status);
        router.push("/");
      } catch (err) {
        console.error(err);
        setResponseStatus(err.response.status);
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
        <h1>Welcome back!</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <Textfield
            label="E-mail"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            disabled={loading}
          />
          <Textfield
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            disabled={loading}
          />
          {responseStatus && responseStatus !== 200 ? (
            <div className="text-red-500 font-bold p-2 text-center">
              Something went wrong
            </div>
          ) : null}
          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
};

export default PageLogin;
