import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import Swal from "sweetalert2";

const MyModelPurchase = () => {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch("https://ai-model-server-phi.vercel.app/purchase")
      .then((res) => res.json())
      .then((data) => {
        const userPurchases = data.filter(
          (item) => item.purchased_By === user.email
        );
        setPurchases(userPurchases);
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
              // UI থেকে remove
              setPurchases((prev) => prev.filter((p) => p._id !== id));
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
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-center font-semibold text-2xl mb-5">
        My Purchase Model: {purchases.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-purple-400 text-left">
              <th>SL No.</th>
              <th>Name</th>
              <th>Framework</th>
              <th>Use Case</th>
              <th>Created By</th>
              <th>Purchased By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No purchases found.
                </td>
              </tr>
            ) : (
              purchases.map((purchase, index) => (
                <tr key={purchase._id} className="border-t">
                  <th>{index + 1}</th>
                  <td>{purchase.name || "-"}</td>
                  <td>{purchase.framework || "-"}</td>
                  <td>{purchase.useCase || "-"}</td>
                  <td>{purchase.createdBy || "-"}</td>
                  <td>{purchase.purchased_By || "-"}</td>

                  <td>
                    <button
                      onClick={() => handleRemove(purchase._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyModelPurchase;
