import React from "react";
function Loader() {
  return (
    <div
      class="animate-spin inline-block w-10 h-10 ml-[50%] border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
      role="status"
      aria-label="loading"
    >
      <span class="sr-only">Loading...</span>
    </div>
  );
}
export default Loader;
