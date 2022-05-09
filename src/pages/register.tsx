import { useFormik } from "formik";
import Textfield from "../component/Textfield";
import * as Yup from "yup";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
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
    onSubmit: (values) => {},
  });
  return (
    <main className="max-w-md mx-auto">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <Textfield
          type="email"
          label="E-mail"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
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
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            fullWidth
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default Register;
