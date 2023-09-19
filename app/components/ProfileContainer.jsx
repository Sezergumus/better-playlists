"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileContainer(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { userData } = props;

  const logout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <>
      {userData && (
        <div
          className="flex items-center gap-2 bg-[#D7DBFF] rounded-full px-4 py-2 cursor-pointer relative"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <Image
            src={userData.images[0].url}
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="name-container flex items-center justify-center gap-1">
            <h1 className="text-bgPrimary font-bold text-sm">
              {userData.display_name}
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="14"
              height="14"
              viewBox="0,0,256,256"
            >
              <g
                fill="#400073"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g transform="scale(5.33333,5.33333)">
                  <path d="M39.061,9.439c-0.586,-0.586 -1.535,-0.586 -2.121,0l-12.94,12.94l-12.939,-12.94c-0.586,-0.586 -1.535,-0.586 -2.121,0l-6.5,6.5c-0.586,0.586 -0.586,1.535 0,2.121l20.5,20.5c0.292,0.294 0.676,0.44 1.06,0.44c0.384,0 0.768,-0.146 1.061,-0.439l20.5,-20.5c0.586,-0.586 0.586,-1.535 0,-2.121z"></path>
                </g>
              </g>
            </svg>
          </div>
          {modalOpen && (
            <div className="absolute top-16 right-0 bg-[#D7DBFF] rounded-lg shadow-lg w-48 px-4 py-2 flex flex-col justify-center z-10">
              <Link
                href="/"
                className="border-b-2 border-black py-2 px-4 hover:bg-[#400073] hover:text-white transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => logout()}
                className="py-2 px-4 hover:bg-bgPrimary hover:text-white transition text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
