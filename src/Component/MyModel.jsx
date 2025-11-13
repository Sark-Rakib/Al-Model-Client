import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import { Link } from "react-router";

const MyModel = () => {
  const { user } = use(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ai-model-server-phi.vercel.app/myModel?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setModels(data);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        My <span className="text-purple-400">Models</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {models.map((model) => (
          <div
            key={model._id}
            data-aos="fade-right"
            className="p-4 rounded-lg shadow-md bg-white flex flex-col"
          >
            <img
              src={model.image}
              alt={model.title}
              className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover rounded-md"
            />
            <h2 className="text-xl text-purple-400 sm:text-2xl font-semibold mt-3">
              {model.name}
            </h2>
            <h2 className="text-purple-400 sm:font-semibold mt-3">
              Created_by: {model.createdBy}
            </h2>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              Framework: {model.framework}
            </p>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              Use Case: {model.useCase}
            </p>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              Dataset: {model.dataset}
            </p>

            <div className="flex justify-between items-center mt-auto pt-3">
              <p className="text-gray-500 text-xs sm:text-sm">
                {new Date(model.createAt).toLocaleDateString()}
              </p>
              <Link to={`/myModel/${model._id}`}>
                <button className="bg-purple-400 p-2 rounded hover:bg-purple-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyModel;
