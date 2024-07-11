import React from "react";

function TruthTable({
  truthList,
  catName,
  handleDeleteTruth,
  handleOpenDrawer,
  handleDrawerTruth,
  initalSlice,
  lastSlice,
}) {
  return (
    <tbody className="divide-y divide-gray-200">
      {truthList.slice(initalSlice, lastSlice)?.map((truth, index) => (
        <tr key={truth.id}>
          <td className="px-4 py-2 font-medium text-gray-900">{(initalSlice+index)+1}</td>
          <td className="px-4 py-2 font-medium text-gray-900">{catName}</td>
          <td className="px-4 py-2 text-gray-700 break-words max-w-sm">
            {truth.question}
          </td>
          <td className="w-20 flex items-center justify-center px-4 py-2 text-gray-700">
            <div className="p-2">
              <i
                className="fa-solid fa-trash text-xl"
                onClick={() => handleDeleteTruth(truth.id)}
              ></i>
            </div>
            <div>
              <i
                className="p-2 fa-solid fa-pen-to-square text-xl"
                onClick={() => {
                  handleOpenDrawer();
                  handleDrawerTruth({ catName, truth });
                }}
              ></i>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TruthTable;
