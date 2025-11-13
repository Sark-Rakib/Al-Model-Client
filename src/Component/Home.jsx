import React from "react";
import { Link, useLoaderData } from "react-router";
import SwiperSlider from "./SwiperSlider";
import StaticSections from "./StaticSections ";

const Home = () => {
  const data = useLoaderData();

  return (
    <div className="w-full">
      <section className="w-full mt-10">
        <SwiperSlider />
      </section>

      <section data-aos="fade-right" className="w-11/12 mx-auto my-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Latest <span className="text-purple-400">Models</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((model) => (
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
              <h2 className="text-xl sm:text-2xl font-semibold mt-3">
                {model.name}
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
                  {new Date(model.createdAt).toLocaleDateString()}
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
      </section>

      <StaticSections></StaticSections>
    </div>
  );
};

export default Home;
