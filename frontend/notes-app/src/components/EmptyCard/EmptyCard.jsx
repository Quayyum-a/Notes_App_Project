import React from "react";

const EmptyCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};

export default EmptyCard;
