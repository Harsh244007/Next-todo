import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen gap-10 items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <h2 className="text-lg text-white font-semibold">Loading</h2>
    </div>
  );
};

export default Loading;