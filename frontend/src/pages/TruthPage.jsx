import React from "react";
import Loader from "../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateDrawer from "../components/UpdateDrawer";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import useTruthPage from "../hooks/useTruthPage";

import Table from "../components/Table/Table";
function TruthPage({ api }) {
  const {
    truthData,
    loading,
    addTruth,
    initalSlice,
    lastSlice,
    openDrawer,
    drawerTruth,
    handleDeleteTruth,
    handleAddTruth,
    handleNextSlice,
    handleUpdateTruth,
    handlePreviousSlice,
    handleDrawerTruth,
    handleCloseDrawer,
    handleOpenDrawer,
    handleAddTruthChange,
  } = useTruthPage(api);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer />
      {openDrawer && (
        <UpdateDrawer
          openDrawer={openDrawer}
          handleCloseDrawer={handleCloseDrawer}
          drawerTruth={drawerTruth}
          handleUpdateTruth={handleUpdateTruth}
        />
      )}

      <div className="divide-y divide-gray-300 flex flex-col justify-between">
        <div className="container mx-auto py-4">
          <div className="flex items-center mb-4">
            <Input
              type="text"
              placeholder="Enter truth..."
              value={addTruth}
              onChange={handleAddTruthChange}
            />
            <Button
              text="Add Truth"
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleAddTruth}
            />
          </div>
        </div>
        <div className="container mx-auto">
          {truthData?.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  There Is no Truths Available.
                </h2>
              </div>
            </div>
          ) : (
            <>
              <div style={{height:"63vh"}}>
                <Table
                  handleDeleteTruth={handleDeleteTruth}
                  handleOpenDrawer={handleOpenDrawer}
                  handleDrawerTruth={handleDrawerTruth}
                  initalSlice={initalSlice}
                  lastSlice={lastSlice}
                  columns={["ID", "Category", "Question"]}
                  data={truthData}
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  disabled={initalSlice <= 0}
                  text="Previous"
                  onClick={handlePreviousSlice}
                  className="bg-red-600"
                  disabledclassname="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md"
                />
                <Button
                  disabled={truthData?.truths?.length <= lastSlice}
                  text="Next"
                  className="bg-red-600"
                  onClick={handleNextSlice}
                  disabledclassname="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TruthPage;
