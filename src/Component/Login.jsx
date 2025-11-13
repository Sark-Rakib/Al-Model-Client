import { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { handleSignIn, handleLogIn } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const haldleLogIn = (e) => {
    e.preventDefault();
    console.log("click");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    handleLogIn(email, password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogIn Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const signIn = () => {
    handleSignIn()
      .then((res) => {
        console.log(res.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="w-11/12 mx-auto justify-center text-center">
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold text-center">Login Your Account</h2>
          <form onSubmit={haldleLogIn} className="card-body">
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                required
              />
              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                required
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>

              {error && (
                <p className="text-red-400 text-center">
                  Invalid Email or Password
                </p>
              )}

              <h2 className="text-center mt-3 text-[14px]">
                Don't Have An Account ?{" "}
                <Link className="text-red-400" to="/register">
                  Register
                </Link>
              </h2>
            </fieldset>
            <button
              onClick={signIn}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
