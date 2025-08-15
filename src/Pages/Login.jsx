import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(4, "Too short!").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

export default function Login() {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) 
      if (user?.username !== values.username) {
        setErrors({ username: "Username is Incorrect" });
        setSubmitting(false);
        return;
      }
      else if(user?.password !== values.password){
        setErrors({ password: "Password is Incorrect" });
        setSubmitting(false);
        return;
      }
      localStorage.setItem("logged" ,true) //token
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-1/2 w-full">
      <div className="p-8 rounded-4xl shadow-lg shadow-gray-700 light:shadow-gray-500 w-[80%] md:w-[70%] lg:w-[50%] border border-first-color light:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-first-color light:text-gray-700 mb-6">Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          <Form className="space-y-5 flex flex-wrap">
            <div className="w-full md:w-1/2 px-4">
              <Field
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 text-second-color light:text-gray-700 border-b-1 focus:outline-none"
              />
              <ErrorMessage name="username" component="div" className="text-red-400 text-sm mt-1" />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 text-second-color light:text-gray-700 border-b-1 focus:outline-none"
              />
              <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="mx-auto bg-gray-800 light:bg-gray-600 hover:light:bg-gray-600/70 px-4 hover:bg-gray-800/70 text-second-color light:text-first-color font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </Form>
        </Formik>
        <p className="mt-6 text-center text-sm text-second-color light:text-gray-700">
           Don’t have an account?{" "}
          <Link to="/register" className="text-gray-300 light:text-gray-600 underline hover:text-storm-100">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}