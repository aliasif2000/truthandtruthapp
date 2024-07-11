import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-80 bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
    </div>
  );
};

export default Loader;
