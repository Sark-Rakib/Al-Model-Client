import { Link, useLoaderData, useNavigate } from "react-router";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const DetailsCard = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [purchasedCount, setPurchasedCount] = useState(data.purchased || 0);

  const isCreator = user?.email === data.createdBy;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-model-server-phi.vercel.app/models/${data._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              navigate("/allModel");
            } else {
              Swal.fire({
                title: "Error",
                text: "Delete failed or nothing to delete!",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch((err) => {
            console.error("Error deleting model:", err);
            Swal.fire({
              title: "Error",
              text: "Something went wrong!",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  const handlePurchase = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to purchase this model",
        icon: "warning",
      });
      return;
    }

    const purchaseData = {
      id: data._id,
      name: data.name,
      image: data.image,
      framework: data.framework,
      useCase: data.useCase,
      dataset: data.dataset,
      createdBy: data.createdBy,
      purchased_By: user.email,
      purchasedAt: new Date().toISOString(),
    };

    fetch(`https://ai-model-server-phi.vercel.app/purchase/${data._id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(purchaseData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPurchasedCount((prev) => prev + 1);

        Swal.fire({
          title: "Purchase Successful!",
          text: `${data.name} purchased by ${user.email}`,
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Already purchased or something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      <div>
        <h2 className="text-2xl font-semibold mb-3">{data.name}</h2>
        <img
          className="w-full h-80 object-cover rounded-md mb-3"
          src={data.image}
          alt={data.name}
        />
      </div>
      <div className="space-y-2">
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
          <strong>Created At:</strong> {data.createdAt}
        </p>
        <p>
          <strong>Purchased:</strong> {purchasedCount}
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
      </div>

      {isCreator && (
        <div className="flex gap-4 mt-5">
          <Link to={`/updateModel/${data._id}`}>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500">
              Update
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      )}

      {!isCreator && (
        <button
          onClick={handlePurchase}
          className="bg-purple-400 p-2 rounded mt-5 hover:bg-purple-300"
        >
          Purchase
        </button>
      )}
    </div>
  );
};

export default DetailsCard;
