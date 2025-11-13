import React from "react";
import { useLoaderData } from "react-router";

const ViewDetails = () => {
  const data = useLoaderData();
  console.log(data);
  if (!data) {
    return;
  }

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
      <div className="md:flex-row gap-8 items-center">
        <img
          src={data.image}
          alt={data.name}
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="md:w-1/2 space-y-2">
          <p>
            <strong>Framework:</strong> {data.framework}
          </p>
          <p>
            <strong>Use Case:</strong> {data.useCase}
          </p>
          <p>
            <strong>Dataset:</strong> {data.dataset}
          </p>
          <p>
            <strong>Created By:</strong> {data.createdBy}
          </p>
          <p>
            <strong>Purchased By:</strong> {data.purchased_By}
          </p>
          <p>
            <strong>Description:</strong> {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
