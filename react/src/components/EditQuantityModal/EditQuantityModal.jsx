import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import "./style/EditQuantityModal.css";

export default function ({ bottle, quantity, handleClose, addToCellar }) {
  const [count, setCount] = useState(1);

  const addQty = () => {
    if (count == 0) {
      handleClose();
    } else {
      addToCellar(bottle, count, quantity);
      handleClose();
    }
  };

  function incrementCount() {
    setCount(parseInt(count) + parseInt(1));
  }

  function decrementCount() {
    setCount((count) => (count > 0 ? count - 1 : 0));
  }

  return (
    <div className="flex edit-modal items-center justify-center backdrop-blur-xl p-[15px] absolute w-full h-full left-0 top-0 z-20">
      <span
        className="close-btn text-center w-[30px] h-[30px] absolute right-[10px] top-[10px] cursor-pointer"
        onClick={handleClose}
      >
        <svg
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Menu / Close_MD">
              {" "}
              <path
                id="Vector"
                d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                stroke={location.pathname.includes("/product") ? "white" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </span>
      <article className="container flex flex-col flex-nowrap absolute place-content-center w-fit">
        <div className="flex flex-row flex-nowrap  w-fit mx-auto">
          <div
            className="increment-btn border-solid border-2 rounded bg-white border-red-900 h-10 w-10 m-2 text-center cursor-pointer"
            onClick={decrementCount}
          >
            <span className="text-red-900">
              <svg
                viewBox="-4.8 -4.8 33.60 33.60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                    fill="#742521"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </div>
          <input
            type="number"
            className="quantity h-10 border-solid border-2 rounded bg-white border-red-900 m-2 bg-transparent text-red-900 text-center"
            value={count}
            onChange={(e) =>
              setCount(e.target.value ? Number(e.target.value) : 0)
            }
          />
          <div
            className="increment-btn border-solid border-2 rounded bg-white border-red-900 h-10 w-10 m-2 text-center cursor-pointer"
            onClick={incrementCount}
          >
            <span className="text-red-900">
              <svg
                viewBox="-4.8 -4.8 33.60 33.60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
                    fill="#742521"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="flex flex-row flex-nowrap w-full mx-auto">
          <button
            className="rounded p-2 bg-transparent w-full m-2 bg-white text-red-900 border-solid border-2 border-red-900"
            onClick={addQty}
          >
            sauvegarder
          </button>
        </div>
      </article>
    </div>
  );
}