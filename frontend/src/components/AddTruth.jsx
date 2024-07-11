import React from "react";
import Input from "./Input/Input";
import Button from "./Button/Button";

function AddTruth({ addTruth, handleAddTruthChange, handleAddTruth }) {
  return (
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddTruth}
        />
      </div>
    </div>
  );
}

export default AddTruth;
