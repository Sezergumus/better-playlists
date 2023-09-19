"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProfileContainer from "./ProfileContainer";
import LogInButton from "./LogInButton";
import { useDataStore } from "@/app/states/data";
import Image from "next/image";

export default function Header(props) {
  const { activePage } = props;

  const { userData } = useDataStore();

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const logout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <>
      {hamburgerOpen ? (
        <div className="hamburger-menu-container absolute w-screen h-screen bg-bgPrimary z-50">
          <div className="hamburger-menu-header flex justify-between px-8 py-4 border-white border-b">
            <div className="logo-container flex gap-2 items-center justify-center">
              <Link href="/" className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="32"
                  height="32"
                  viewBox="0,0,256,256"
                >
                  <g
                    fill="#ffffff"
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
                    <g transform="scale(9.84615,9.84615)">
                      <path d="M13,0c-7.19922,0 -13,5.80078 -13,13c0,7.19922 5.80078,13 13,13c7.19922,0 13,-5.80078 13,-13c0,-7.19922 -5.80078,-13 -13,-13zM18.30078,19.10156c-0.19922,0 -0.40234,-0.10156 -0.60156,-0.20312c-1.89844,-1.09766 -4.19922,-1.69922 -6.69922,-1.69922c-1.39844,0 -2.80078,0.19922 -4.10156,0.5c-0.19922,0 -0.5,0.10156 -0.59766,0.10156c-0.5,0 -0.80078,-0.40234 -0.80078,-0.80078c0,-0.5 0.30078,-0.80078 0.69922,-0.89844c1.60156,-0.40234 3.19922,-0.60156 4.90234,-0.60156c2.79688,0 5.39844,0.69922 7.59766,2c0.30078,0.19922 0.5,0.39844 0.5,0.89844c-0.09766,0.40234 -0.5,0.70313 -0.89844,0.70313zM19.69922,15.69922c-0.30078,0 -0.5,-0.09766 -0.69922,-0.19922c-2.10156,-1.30078 -5,-2.10156 -8.30078,-2.10156c-1.59766,0 -3.09766,0.20313 -4.19922,0.5c-0.30078,0.10156 -0.39844,0.10156 -0.60156,0.10156c-0.59766,0 -1,-0.5 -1,-1c0,-0.60156 0.30078,-0.89844 0.80078,-1.10156c1.5,-0.39844 3,-0.69922 5.10156,-0.69922c3.39844,0 6.69922,0.80078 9.30078,2.40234c0.39844,0.19922 0.59766,0.59766 0.59766,1c0,0.59766 -0.39844,1.09766 -1,1.09766zM21.30078,11.69922c-0.30078,0 -0.40234,-0.09766 -0.69922,-0.19922c-2.40234,-1.39844 -6,-2.19922 -9.5,-2.19922c-1.80078,0 -3.60156,0.19922 -5.20313,0.59766c-0.19922,0 -0.39844,0.10156 -0.69922,0.10156c-0.69922,0.10156 -1.19922,-0.5 -1.19922,-1.19922c0,-0.69922 0.39844,-1.10156 0.89844,-1.19922c1.90234,-0.60156 3.90234,-0.80078 6.20313,-0.80078c3.79688,0 7.79687,0.80078 10.79687,2.5c0.40234,0.19922 0.70313,0.59766 0.70313,1.19922c-0.10156,0.69922 -0.60156,1.19922 -1.30078,1.19922z"></path>
                    </g>
                  </g>
                </svg>
                <h1 className="text-white text-xl">
                  Better<b>Playlists</b>
                </h1>
              </Link>
            </div>
            <div
              className="hamburger-menu-close"
              onClick={() => {
                setHamburgerOpen(!hamburgerOpen);
              }}
            >
              <div className="hamburger-icon open">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          {userData ? (
            <div className="hamburger-menu-profile-container flex flex-col justify-center gap-4">
              <div className="profile-container-mobile flex px-8 mt-4 gap-2 items-center">
                <h1 className="text-white text-xl">
                  Welcome, <b className="capitalize">{userData.display_name}</b>
                  !
                </h1>
                <Image
                  src={userData.images[0].url}
                  alt="Profile Picture"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>

              <div className="hamburger-menu-links-flex flex flex-col gap-4 text-white text-2xl font-bold absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <Link
                  href="/"
                  className={activePage === "dashboard" ? "active" : null}
                >
                  Dashboard
                </Link>
                <Link
                  href="/playlists"
                  className={activePage === "playlists" ? "active" : null}
                >
                  Create Playlist
                </Link>
                <div onClick={() => logout()}>Logout</div>
              </div>
            </div>
          ) : (
            <div className="hamburger-menu-login-logout absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
              <LogInButton buttonText={"Sign in with spotify!"} />
            </div>
          )}
        </div>
      ) : null}
      <div className="header-container flex items-center justify-between bg-bgPrimary px-8 py-4">
        <div className="logo-container flex gap-2 items-center justify-center">
          <Link href="/" className="flex justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0,0,256,256"
            >
              <g
                fill="#ffffff"
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
                <g transform="scale(9.84615,9.84615)">
                  <path d="M13,0c-7.19922,0 -13,5.80078 -13,13c0,7.19922 5.80078,13 13,13c7.19922,0 13,-5.80078 13,-13c0,-7.19922 -5.80078,-13 -13,-13zM18.30078,19.10156c-0.19922,0 -0.40234,-0.10156 -0.60156,-0.20312c-1.89844,-1.09766 -4.19922,-1.69922 -6.69922,-1.69922c-1.39844,0 -2.80078,0.19922 -4.10156,0.5c-0.19922,0 -0.5,0.10156 -0.59766,0.10156c-0.5,0 -0.80078,-0.40234 -0.80078,-0.80078c0,-0.5 0.30078,-0.80078 0.69922,-0.89844c1.60156,-0.40234 3.19922,-0.60156 4.90234,-0.60156c2.79688,0 5.39844,0.69922 7.59766,2c0.30078,0.19922 0.5,0.39844 0.5,0.89844c-0.09766,0.40234 -0.5,0.70313 -0.89844,0.70313zM19.69922,15.69922c-0.30078,0 -0.5,-0.09766 -0.69922,-0.19922c-2.10156,-1.30078 -5,-2.10156 -8.30078,-2.10156c-1.59766,0 -3.09766,0.20313 -4.19922,0.5c-0.30078,0.10156 -0.39844,0.10156 -0.60156,0.10156c-0.59766,0 -1,-0.5 -1,-1c0,-0.60156 0.30078,-0.89844 0.80078,-1.10156c1.5,-0.39844 3,-0.69922 5.10156,-0.69922c3.39844,0 6.69922,0.80078 9.30078,2.40234c0.39844,0.19922 0.59766,0.59766 0.59766,1c0,0.59766 -0.39844,1.09766 -1,1.09766zM21.30078,11.69922c-0.30078,0 -0.40234,-0.09766 -0.69922,-0.19922c-2.40234,-1.39844 -6,-2.19922 -9.5,-2.19922c-1.80078,0 -3.60156,0.19922 -5.20313,0.59766c-0.19922,0 -0.39844,0.10156 -0.69922,0.10156c-0.69922,0.10156 -1.19922,-0.5 -1.19922,-1.19922c0,-0.69922 0.39844,-1.10156 0.89844,-1.19922c1.90234,-0.60156 3.90234,-0.80078 6.20313,-0.80078c3.79688,0 7.79687,0.80078 10.79687,2.5c0.40234,0.19922 0.70313,0.59766 0.70313,1.19922c-0.10156,0.69922 -0.60156,1.19922 -1.30078,1.19922z"></path>
                </g>
              </g>
            </svg>
            <h1 className="text-white text-xl">
              Better<b>Playlists</b>
            </h1>
          </Link>
        </div>
        <div className="links-flex flex gap-8 text-white text-xl">
          <Link
            href="/"
            className={activePage === "dashboard" ? "active" : null}
          >
            Dashboard
          </Link>
          <Link
            href="/playlists"
            className={activePage === "playlists" ? "active" : null}
          >
            Create Playlist
          </Link>
        </div>
        <div className="profile-container">
          <div className="login-logout">
            {!userData ? (
              <LogInButton buttonText={"Sign in with spotify!"} />
            ) : (
              <ProfileContainer userData={userData} />
            )}
          </div>
        </div>
        <div className="hamburger-menu">
          <div
            className="hamburger-icon"
            onClick={() => {
              setHamburgerOpen(!hamburgerOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}
