import React from "react";
import { useLoaderData } from "react-router";

const MyModelDetails = () => {
  const model = useLoaderData();

  return (
    <div className="w-10/12 mx-auto mt-10">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold text-purple-500 mb-2">
          {model.name}
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Created By:</strong> {model.createdBy}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Framework:</strong> {model.framework}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Use Case:</strong> {model.useCase}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Dataset:</strong> {model.dataset}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Created At:</strong> {model.createAt}
        </p>
        <p className="text-gray-700 mt-3">
          <strong>Description:</strong> {model.description}
        </p>
      </div>
    </div>
  );
};

export default MyModelDetails;
