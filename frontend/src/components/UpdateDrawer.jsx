import React, { useState } from "react";

function UpdateDrawer({
  openDrawer,
  handleCloseDrawer,
  drawerTruth,
  handleUpdateTruth,
}) {
  const [updateTruth, setUpdateTruth] = useState(drawerTruth);
  const [changeTruth, setChangeTruth] = useState(updateTruth?.truth);
  const [errors, setErrors] = useState("");

  const handleChangeTruth = (e) => {
    setChangeTruth((pv) => ({ ...pv, question: e.target.value }));
  };
  const handleSubmitTruth = () => {
    const checkTruth = changeTruth.question;
    if (checkTruth.trim() != "" && updateTruth.truth.question != checkTruth) {
      handleUpdateTruth(changeTruth);
      setErrors("");
    } else {
      setErrors("Truth is required");
    }
  };
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
        openDrawer ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-lg font-semibold">Update Truth</h2>
          <button className="text-gray-600">
            <i
              className="fa-solid fa-xmark text-xl"
              onClick={handleCloseDrawer}
            ></i>
          </button>
        </div>
        <div className="p-4">
          <div className="mb-6">
            <label
              for="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <input
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={updateTruth?.catName}
              disabled={true}
            />
          </div>
          <label
            htmlFor="truth"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Truth
          </label>
          <textarea
            id="truth"
            value={changeTruth?.question}
            onChange={handleChangeTruth}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            rows={4}
            placeholder="Enter updated truth..."
          />
          {errors && <span className="text-red-700">{errors}</span>}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmitTruth}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDrawer;
