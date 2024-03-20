import Link from "next/link";
import React from "react";

type Props = {
  data: any[];
};

export default function ElementList({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col">
        <h1>No Projekt published yet. Come back later.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 sm:grid sm:grid-cols-2 lg:grid-cols-3 p-5 ">
      {data && data.map((item) => {
        // Remove data prefix if present
        const base64String = item.displayImage;
        // Decode base64 string to binary data
        const binaryData = atob(base64String);
        // Create a Uint8Array from binary data
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        // Create a Blob object with 'image/png' MIME type
        const blob = new Blob([uint8Array], { type: "image/png" });
        // Create URL for the Blob object
        const imageUrl = URL.createObjectURL(blob);

        return (
          <Link
            href={`/projekt/${item.id}`}
            key={item.id}
            className="flex flex-col transition hover:-translate-y-2 ease-in cursor-pointer"
          >
            <div className="relative h-[260px]">
              <img
                src={imageUrl}
                alt="Project Image"
                className="bg-blue-200 rounded-xl w-[100%] absolute top-0 left-0 right-0 bottom-0 h-[100%] object-cover border"
              />
            </div>
            <div>
              <span className="text-slate-400 font-light">
                {item.projektBezeichnung}
              </span>
              <h3 className="text-md line-clamp-2">{item.projektNummer}</h3>
              <p className="text-sm  text-slate-400">{item.subtitle}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
