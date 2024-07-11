import React from "react";
import Loader from "../components/Loader";
import TruthTable from "../components/TruthTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateDrawer from "../components/UpdateDrawer";
import Button from "../components/Button/Button";
import useTruthPage from "../hooks/useTruthPage";
import Input from "../components/Input/Input";
import AddTruth from "../components/AddTruth";
function TruthPage({ api }) {
  const {
    truthList,
    catName,
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
        <AddTruth
          addTruth={addTruth}
          handleAddTruthChange={handleAddTruthChange}
          handleAddTruth={handleAddTruth}
        />
        <div className="container mx-auto">
          {truthList.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  There Is no Truths Available.
                </h2>
              </div>
            </div>
          ) : (
            <>
              <div className="pt-3 min-h-70 overflow-x-auto  mx-auto shadow-md rounded-lg flex mt-5">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-base">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Id
                      </th>
                      <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Category
                      </th>
                      <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Truth
                      </th>
                      <th className="w-20"></th>
                    </tr>
                  </thead>
                  <TruthTable
                    handleDeleteTruth={handleDeleteTruth}
                    truthList={truthList}
                    catName={catName}
                    handleOpenDrawer={handleOpenDrawer}
                    handleDrawerTruth={handleDrawerTruth}
                    initalSlice={initalSlice}
                    lastSlice={lastSlice}
                  />
                </table>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  disabled={initalSlice <= 0}
                  text="Previous"
                  onClick={handlePreviousSlice}
                  disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md"
                />
                <Button
                  disabled={truthList.length <= lastSlice}
                  text="Next"
                  onClick={handleNextSlice}
                  disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md"
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
