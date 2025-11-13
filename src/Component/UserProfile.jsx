import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router";

const UserProfile = () => {
  const { user, handleLogOut } = use(AuthContext);
  const navigate = useNavigate();
  console.log(user);

  const logOutHandler = () => {
    handleLogOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="w-11/12 mx-auto mt-10 bg-purple-300 rounded p-5">
      <div className="flex justify-center gap-5 mb-10 underline font font-semibold">
        <NavLink to="/myModel">My Model</NavLink>
        <NavLink to="/myModelPurchase">My Model Purchase</NavLink>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div>
          <img className="rounded-full" src={user?.photoURL} alt="" />
        </div>
        <div>
          <h1> {user?.displayName}</h1>
          <p>{user?.email}</p>
          <div className="flex gap-10">
            <button className="mt-10 bg-purple-500 rounded p-2 hover:bg-purple-400">
              Update Profile
            </button>
            <button
              onClick={logOutHandler}
              className="mt-10 bg-purple-500 rounded p-2 hover:bg-purple-400"
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
