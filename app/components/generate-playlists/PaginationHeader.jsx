"use client";

import React from "react";

export default function PaginationHeader({ step, setStep }) {
  const stepHeaders = {
    1: "Select From Favorites",
    2: "Select Songs",
    3: "Create Playlist",
  };
  return (
    <div className="flex flex-col justify-center items-center mt-8 gap-2">
      <h1 className="text-bgPrimary text-3xl font-bold">{stepHeaders[step]}</h1>
      <div className="flex justify-center items-center gap-2 pagination-header">
        <div
          className={
            "w-10 h-10 rounded-full border-2 border-bgPrimary flex justify-center items-center" +
            (step === 1 ? " active" : "")
          }
          onClick={() => {
            setStep(1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
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
              <g transform="scale(8.53333,8.53333)">
                <path d="M11,2c-1.105,0 -2,0.895 -2,2v8v1v6.5c-2.552,-1.299 -3.711,-1.5 -5,-1.5c-1.49609,0 -2.99026,0.57731 -2.99805,2.48633l4.49805,2.01367l3.15625,3.15625c1.5,1.5 3.5362,2.34375 5.6582,2.34375h6.68555c2.209,0 4,-1.791 4,-4v-10c0,-1.10457 -0.89543,-2 -2,-2c-0.77365,0.00117 -1.47724,0.44842 -1.80664,1.14844c-0.12655,-0.0862 -0.19336,-0.14844 -0.19336,-0.14844c0,-1.10457 -0.89543,-2 -2,-2c-1.10457,0 -2,0.89543 -2,2v-1c0,-1.105 -0.895,-2 -2,-2c-1.105,0 -2,0.895 -2,2v-8c0,-1.105 -0.895,-2 -2,-2zM1.00195,20.48633h-0.00195v0.01367c0,-0.00501 0.00193,-0.00868 0.00195,-0.01367z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div
          className={
            "w-10 h-10 rounded-full border-2 border-bgPrimary flex justify-center items-center" +
            (step === 2 ? " active" : "") +
            (step < 2 ? " disabled" : "")
          }
          onClick={() => {
            setStep(2);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
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
              <g transform="scale(9.84615,9.84615)">
                <path d="M21.5625,0.17188l-11.10937,3.39844c-1.34766,0.38281 -2.4375,1.78516 -2.4375,3.13281v11.55859c0,0 0,0.15625 0,0.16016c0,0 -0.80469,-0.54297 -2.59766,-0.28906c-2.63281,0.375 -4.76953,2.39453 -4.76953,4.51563c0,2.12109 2.13672,3.41797 4.76953,3.04297c2.63672,-0.37109 4.56641,-2.32812 4.56641,-4.44922c0,0 0,-9.06641 0,-10.00781c0,-0.9375 1.12891,-1.34375 1.12891,-1.34375l9.82422,-3.07812c0,0 1.08594,-0.36328 1.08594,0.64063c0,1.00781 0,8.03125 0,8.03125c0,0 0,0.00391 0,0.00781c0,0 -1,-0.57812 -2.79297,-0.35937c-2.63281,0.32031 -4.76953,2.29687 -4.76953,4.41797c0,2.12109 2.13672,3.46094 4.76953,3.14063c2.63281,-0.31641 4.76953,-2.29687 4.76953,-4.41797v-16.36328c0,-1.34375 -1.09375,-2.125 -2.4375,-1.73828z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div
          className={
            "w-10 h-10 rounded-full border-2 border-bgPrimary flex justify-center items-center" +
            (step === 3 ? " active" : "") +
            (step < 3 ? " disabled" : "")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0,0,256,256"
          >
            <defs>
              <linearGradient
                x1="24.175"
                y1="10.204"
                x2="24.175"
                y2="39"
                gradientUnits="userSpaceOnUse"
                id="color-1_sz8cPVwzLrMP_gr1"
              >
                <stop offset="0.278" stop-color="#400073"></stop>
                <stop offset="0.458" stop-color="#400073"></stop>
                <stop offset="0.79" stop-color="#400073"></stop>
                <stop offset="1" stop-color="#400073"></stop>
              </linearGradient>
            </defs>
            <g transform="translate(-26.88,-26.88) scale(1.21,1.21)">
              <g
                fill="url(#color-1_sz8cPVwzLrMP_gr1)"
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
                  <path d="M21,39c-0.92499,0.00397 -1.82207,-0.31664 -2.535,-0.906l-13.627,-11.718c-0.61265,-0.53309 -0.69353,-1.45543 -0.183,-2.087l3.164,-3.873c0.25643,-0.31431 0.62923,-0.51136 1.03337,-0.54622c0.40414,-0.03486 0.80517,0.09546 1.11163,0.36122l10.636,9.234l17.1,-18.771c0.55371,-0.60918 1.49492,-0.65827 2.109,-0.11l3.728,3.346c0.29718,0.26651 0.47587,0.64049 0.49652,1.03913c0.02065,0.39865 -0.11846,0.78908 -0.38652,1.08487l-19.667,21.619c-0.76251,0.84174 -1.84425,1.32344 -2.98,1.327z"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
