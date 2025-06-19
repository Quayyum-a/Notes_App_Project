import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      {imgSrc && (
        <img
          src={imgSrc}
          alt="Empty"
          className="mb-4 w-32 h-32 object-contain"
        />
      )}
      <p className="text-lg">{message || "Nothing to show here."}</p>
    </div>
  );
};

export default EmptyCard;
