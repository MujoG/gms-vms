import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div className="flex mt-10 mx-2  relative">
      <div className="flex flex-col p-10">
        <span>kilometres / month</span>
        <span> rides / month</span>
        <span> diesel / month</span>
      </div>
    </div>
  );
}

export default Page;
