// import React from 'react'

// function ShowTruth() {
//   return (
//     <div className="container mx-auto">
//           {truthList.length === 0 ? (
//             <div className="h-80 flex items-center justify-center">
//               <div className="text-center">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   There Is no Truths Available.
//                 </h2>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="pt-3 min-h-70 overflow-x-auto  mx-auto shadow-md rounded-lg flex mt-5">
//                 <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-base">
//                   <thead className="ltr:text-left rtl:text-right">
//                     <tr>
//                       <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                         Id
//                       </th>
//                       <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                         Category
//                       </th>
//                       <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                         Truth
//                       </th>
//                       <th className="w-20"></th>
//                     </tr>
//                   </thead>
//                   <TruthTable
//                     handleDeleteTruth={handleDeleteTruth}
//                     truthList={truthList}
//                     catName={catName}
//                     handleOpenDrawer={handleOpenDrawer}
//                     handleDrawerTruth={handleDrawerTruth}
//                     initalSlice={initalSlice}
//                     lastSlice={lastSlice}
//                   />
//                 </table>
//               </div>
//               <div className="flex justify-between mt-4">
//                 <Button
//                   disabled={initalSlice <= 0}
//                   text="Previous"
//                   onClick={handlePreviousSlice}
//                   disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md"
//                 />
//                 <Button
//                   disabled={truthList.length <= lastSlice}
//                   text="Next"
//                   onClick={handleNextSlice}
//                   disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//   )
// }

// export default ShowTruth
