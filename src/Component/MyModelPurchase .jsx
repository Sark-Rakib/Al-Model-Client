import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const MyModelPurchase = () => {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://ai-model-server-phi.vercel.app/purchase?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setPurchases(data))
        .catch((err) => console.error(err));
    } else {
      setPurchases([]);
    }
  }, [user]);

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Model Purchases:
        <span className="text-purple-500">{purchases.length}</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Framework</th>
              <th>Use Case</th>
              <th>Created By</th>
              <th>Purchased By</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={purchase._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={purchase.image} alt={purchase.name} />
                    </div>
                  </div>
                </td>

                <td>{purchase.name}</td>
                <td>{purchase.framework}</td>
                <td>{purchase.useCase}</td>
                <td>{purchase.createdBy}</td>
                <td>{purchase.purchased_By}</td>

                <td>
                  <Link to="/models/:id">
                    <button className="py-5 px-3 btn md:btn btn-outline btn-xs">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyModelPurchase;
