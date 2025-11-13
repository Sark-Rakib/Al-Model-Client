import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import Swal from "sweetalert2";

const MyModelPurchase = () => {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email);

    fetch(`https://ai-model-server-phi.vercel.app/purchase?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This purchase will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-model-server-phi.vercel.app/purchase/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Removed!",
                text: "Purchase removed successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Failed to remove purchase.",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error",
              text: "Something went wrong!",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          });
      }
      setPurchases((prev) => prev.filter((p) => p._id !== id));
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-center font-semibold text-2xl mb-5">
        My Purchase Model: {purchases.length}
      </h1>

      <div className="ml-4">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>framework</th>
                <th>useCase</th>
                <th>Create_By</th>
                <th>Purchased_By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {purchases.map((purchase, index) => (
                <tr key={purchase._id}>
                  <th>{index + 1}</th>

                  {/* Image */}
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={purchase.modelImage || purchase.image}
                          alt={purchase.name}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Model Name */}
                  <td className="font-semibold">
                    {purchase.modelName || purchase.name}
                  </td>

                  {/* Framework */}
                  <td>{purchase.framework}</td>

                  {/* Use Case */}
                  <td>{purchase.useCase}</td>

                  {/* Created By */}
                  <td>{purchase.createdBy}</td>
                  <td>{purchase.purchased_By}</td>

                  {/* Actions */}
                  <td>
                    <button
                      onClick={() => handleRemove(purchase._id)}
                      className="btn btn-outline btn-xs"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyModelPurchase;
