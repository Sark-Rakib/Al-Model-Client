import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateModel = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  //   console.log(data);

  const handleAddModel = (e) => {
    e.preventDefault();

    const form = {
      name: e.target.name.value,
      framework: e.target.framework.value,
      useCase: e.target.useCase.value,
      dataset: e.target.dataset.value,
      description: e.target.description.value,
      image: e.target.image.value,
      createdBy: e.target.email.value,
      createdAt: e.target.createdAt.value,
    };

    fetch(`https://ai-model-server-phi.vercel.app/models/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.modifiedCount > 0) {
          navigate(`/detailsCard/${data._id}`);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Model Update Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No changes were made!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error("Error updating model:", err);
      });
  };
  return (
    <div className="relative text-center mx-auto mt-10 w-11/12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      ></div>

      <div className="relative p-5">
        <h2 className="text-2xl font-semibold">Update Model</h2>
        <form onSubmit={handleAddModel} className="mt-5 space-y-4">
          <input
            type="text"
            defaultValue={data.name}
            name="name"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            defaultValue={data.framework}
            name="framework"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            defaultValue={data.useCase}
            name="useCase"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            defaultValue={data.dataset}
            name="dataset"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            defaultValue={data.description}
            name="description"
            className="border p-2 rounded w-full"
          />
          <input
            type="url"
            defaultValue={data.image}
            name="image"
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            defaultValue={data.createdBy}
            name="email"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            defaultValue={data.createdAt}
            name="createdAt"
            className="border p-2 rounded w-full"
          />
          <button className="bg-purple-500 p-2 rounded w-full hover:bg-purple-400">
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModel;
