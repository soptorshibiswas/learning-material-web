import React from "react";

const FacebookIcon: React.FC<React.HTMLAttributes<SVGElement>> = (
  props
): JSX.Element => {
  return (
    <svg
      {...props}
      width="44"
      height="45"
      viewBox="0 0 44 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M41.5716 44.8808C42.9125 44.8808 44 43.7894 44 42.4433V3.15334C44 1.807 42.9125 0.71582 41.5716 0.71582H2.42842C1.08694 0.71582 0 1.807 0 3.15334V42.4433C0 43.7894 1.08694 44.8808 2.42842 44.8808H41.5716Z"
          fill="#395185"
        />
        <path
          d="M30.359 44.8808V27.7778H36.0785L36.9347 21.1125H30.359V16.8568C30.359 14.927 30.893 13.6119 33.65 13.6119L37.1664 13.6104V7.64898C36.558 7.56772 34.4707 7.38623 32.0425 7.38623C26.9725 7.38623 23.5017 10.4924 23.5017 16.1969V21.1125H17.7676V27.7778H23.5017V44.8808H30.359Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_130:417">
          <rect
            width="44"
            height="44.1648"
            fill="white"
            transform="translate(0 0.71582)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FacebookIcon;
