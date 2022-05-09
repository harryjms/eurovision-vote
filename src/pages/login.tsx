import { useFormik } from "formik";
import Head from "next/head";
import { useState } from "react";
import Textfield from "../component/Textfield";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../providers/AuthProvider";
import UserHelper from "../helpers/UserHelper";
import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";
import { decodeToken } from "../helpers/jwt";
const PageLogin = () => {
  const { user, fetchUser } = useAuth();
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
        fetchUser();
        router.push("/");
      } catch (err) {
        console.error(err);
        setResponseStatus(err.response.status);
        setLoading(false);
      }
    },
  });

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Register | Eurovision You Decide</title>
      </Head>
      <main className="max-w-md mx-auto">
        <h1>Welcome back!</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
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
          <Textfield
            type="password"
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get(process.env.AUTH_TOKEN_COOKIE);
  if (token) {
    const payload = decodeToken(token);
    if (payload) {
      context.res.setHeader("location", "/");
      context.res.statusCode = 302;
      context.res.end();
      return;
    }
  }

  return { props: {} };
}

export default PageLogin;
