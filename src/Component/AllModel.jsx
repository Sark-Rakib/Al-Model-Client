import { Link, useLoaderData } from "react-router";
import StaticSections from "./StaticSections ";
import { useState } from "react";

const AllModel = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [framework, setFramework] = useState("");

  const filteredModels = data.filter((model) => {
    const matchSearch =
      !searchText ||
      (model.name || "").toLowerCase().includes(searchText.toLowerCase());
    const matchFramework =
      !framework || model.framework.toLowerCase() === framework.toLowerCase();
    return matchSearch && matchFramework;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(search);
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All <span className="text-purple-400">Models</span>
      </h1>

      {/* Search + Framework Filter */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        {/* Left side: Search input + button */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 join  sm:flex-none"
        >
          <input
            type="text"
            placeholder="Search by Name"
            className="input input-bordered w-full rounded-l sm:w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-purple rounded-r" type="submit">
            Search
          </button>
        </form>

        {/* Right side: Framework filter */}
        <select
          className="select select-bordered w-full sm:w-60"
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
        >
          <option value="">All Frameworks</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="PyTorch">PyTorch</option>
          <option value="Keras">Keras</option>
          <option value="Caffe">Caffe</option>
          <option value="C++">C++</option>
        </select>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredModels.map((model) => (
          <div
            key={model._id}
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
              Created by: {model.createdBy}
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

      <StaticSections />
    </div>
  );
};

export default AllModel;
