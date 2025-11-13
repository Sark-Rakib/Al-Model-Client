import { Link, useLoaderData } from "react-router";
import StaticSections from "./StaticSections ";
import { useState } from "react";

const AllModel = () => {
  const data = useLoaderData();
  const [models, setModels] = useState(data);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);

    fetch(`http://localhost:5000/search?search=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setModels(data);
      });
  };

  console.log(data);
  return (
    <div data-aos="fade-right" className="w-11/12 mx-auto my-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-6 text-center">
          All <span className="text-purple-400">Models</span>
        </h1>
        <form onSubmit={handleSearch} className="join">
          <input
            className="input join-item"
            placeholder="Search"
            name="search"
          />
          <button className="btn join-item rounded">Search</button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {models.map((model) => (
          <div
            key={model._id}
            data-aos="fade-right"
            className="p-4 rounded-lg shadow-md bg-white flex flex-col"
          >
            <img
              src={model?.image}
              alt={model?.title}
              className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover rounded-md"
            />
            <h2 className="text-xl text-purple-400 sm:text-2xl font-semibold mt-3">
              {model.name}
            </h2>
            <h2 className="text-purple-400 sm:font-semibold mt-3">
              Created_by: {model?.createdBy}
            </h2>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              Framework: {model?.framework}
            </p>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              Use Case: {model?.useCase}
            </p>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              Dataset: {model?.dataset}
            </p>

            <div className="flex justify-between items-center mt-auto pt-3">
              <p className="text-gray-500 text-xs sm:text-sm">
                {new Date(model?.createdAt).toLocaleDateString()}
              </p>
              <Link to={`/detailsCard/${model._id}`}>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm sm:text-base">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <StaticSections></StaticSections>
    </div>
  );
};

export default AllModel;
