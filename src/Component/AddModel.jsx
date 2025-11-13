import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddModel = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const handleAddModel = (e) => {
    e.preventDefault();

    const form = {
      name: e.target.name.value,
      framework: e.target.framework.value,
      useCase: e.target.useCase.value,
      dataset: e.target.dataset.value,
      description: e.target.description.value,
      image: e.target.image.value,
      createAt: e.target.createAt.value,
      createdBy: user.email,
      purchased: e.target.purchased.value,
    };

    fetch("https://ai-model-server-phi.vercel.app/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/allModel");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Model Added",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="w-11/15 mx-auto mt-10 p-6 bg-purple-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New AI Model</h2>
      <form onSubmit={handleAddModel} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Model Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="framework"
          placeholder="Framework (e.g., TensorFlow)"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="useCase"
          placeholder="Use Case (e.g., NLP)"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="dataset"
          placeholder="Dataset (e.g., Wikipedia)"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          rows={4}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="createdBy"
          placeholder="Created By (Email)"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="createAt"
          placeholder="CreateAt"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="purchased"
          placeholder="Purchased Count"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition"
        >
          Add Model
        </button>
      </form>
    </div>
  );
};

export default AddModel;
