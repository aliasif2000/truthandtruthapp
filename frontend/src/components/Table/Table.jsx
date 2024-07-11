import React from "react";

function Table({ columns, data, ...props }) {
  return (
    <>
      <div className="pt-3 min-h-70 overflow-x-auto  mx-auto shadow-md rounded-lg flex mt-5">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-base">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {columns?.map((column) => (
                <th
                  key={column}
                  className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  {column}
                </th>
              ))}
              <th className="w-20"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.truths
              ?.slice(props.initalSlice, props.lastSlice)
              ?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) =>
                    column === "Category" ? (
                      <td
                        className="px-4 py-2 text-gray-700 break-words max-w-sm"
                        key={colIndex}
                      >
                        {data.categoryname}
                      </td>
                    ) : (
                      <td
                        className="px-4 py-2 text-gray-700 break-words max-w-sm"
                        key={colIndex}
                      >
                        {column.toLowerCase() !== "id"
                          ? row[column.toLowerCase()]
                          : props.initalSlice
                          ? props?.initalSlice + rowIndex + 1
                          : rowIndex + 1}
                      </td>
                    )
                  )}
                  {props.handleDeleteTruth &&
                    props.handleDrawerTruth &&
                    props.handleOpenDrawer && (
                      <td className="w-20 flex items-center justify-center px-4 py-2 text-gray-700">
                        <div className="p-2">
                          <i
                            className="fa-solid fa-trash text-xl"
                            onClick={() => props.handleDeleteTruth(row.id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            className="p-2 fa-solid fa-pen-to-square text-xl"
                            onClick={() => {
                              props.handleOpenDrawer();
                              props.handleDrawerTruth({
                                catName: data.categoryname,
                                question: row,
                              });
                            }}
                          ></i>
                        </div>
                      </td>
                    )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
