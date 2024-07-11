import React from "react";

const Card = ({ imgScr, cardTitle, totalTruth }) => {
  return (
    <div className="max-w-xs sm:max-w-md md:max-w-lg bg-white rounded-lg shadow-md overflow-hidden mx-2 my-4">
      <div className="bg-gray-200 dark:bg-gray-700 p-4 flex items-center justify-center">
        <img
          src={imgScr}
          alt=""
          className="h-24 w-24 object-cover rounded-full"
        />
      </div>
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {cardTitle}
        </h5>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Total: {totalTruth}
        </p>
      </div>
    </div>
  );
};

export default Card;
