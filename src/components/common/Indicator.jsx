import React from "react";

const Indicator = ({ data }) => {
  return (
    <div>
      {data > 0 ? (
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L3 11h5v11h8V11h5L12 2z" fill="green" />
        </svg>
      ) : (
        <>
          {data < 0 ? (
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22L21 13h-5V2H8v11H3l9 9z" fill="red" />
            </svg>
          ) : (
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="11" width="16" height="2" fill="gray" />
            </svg>
          )}
        </>
      )}
    </div>
  );
};

export default Indicator;
