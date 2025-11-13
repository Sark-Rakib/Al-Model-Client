import React, { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";

const Register = () => {
  const { handleSignIn, handleRegisters } = use(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    // Check validity
    if (!hasUppercase) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least one uppercase letter!",
      });
      return;
    }

    if (!hasLowercase) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least one lowercase letter!",
      });
      return;
    }

    if (!isValidLength) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters long!",
      });
      return;
    }

    console.log(name, photo, email, password);

    handleRegisters(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess(`User registered: ${user.email}`);
        Swal.fire({
          icon: "success",
          title: "User Registered",
          text: "Register Successfull",
        });
        e.target.reset();
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Invalid Email",
          text: "This Email is Used",
        });
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
    <div className="w-11/12 mx-auto">
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold text-center">Register Your Account</h2>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="Name"
                required
              />

              <label className="label">Photo URL</label>
              <input
                type="text"
                className="input"
                placeholder="PhotoURL"
                name="photo"
                required
              />

              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                required
              />

              <label className="label">Password</label>

              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                required
              />

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>

              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && (
                <p className="text-green-500 text-center">{success}</p>
              )}

              <h2 className="text-center mt-3 text-[14px]">
                Already Have An Account?{" "}
                <a className="text-red-400 underline" href="/login">
                  Log In
                </a>
              </h2>
            </fieldset>
          </form>
          <button
            type="submit"
            onClick={signIn}
            className="btn bg-white text-black border-[#e5e5e5] w-85 mx-auto"
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
        </div>
      </div>
    </div>
  );
};

export default Register;
