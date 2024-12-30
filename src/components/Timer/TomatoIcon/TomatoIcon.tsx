import { FC } from "react";

interface TomatoIconProps {
  className?: string;
}

const TomatoIcon: FC<TomatoIconProps> = ({ className }) => {
  return (
    <svg
      width="15px"
      height="15px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <title>tomato</title>
        <path d="M13,2a11.32,11.32,0,0,0-1,2c-.12.33-.22.66-.31,1C11.07,3.26,8.19,3.54,7,3c0,3.38,3.52,2.21,4.25,2.72C8.42,5.48,7.39,7.39,6,8c3.1,1.57,5,.06,5.72-1.84-.11.74-.65,4.92,2.28,4.84a8.14,8.14,0,0,0-1.31-4.91h.06C14,7.59,15.94,9.3,18,8a7.19,7.19,0,0,0-3.75-2.06C15.84,6,16.91,6.13,18,4a8.42,8.42,0,0,0-4.69,1c.47-.8,1.18-2,1.69-3ZM7,5c-3.91.89-5,4.23-5,8C2,18,6.47,22,12,22c4.89,0,10-2.84,10-10,0-3-1.17-6-4-7a1.88,1.88,0,0,1-1,1c.54.19,1.42,1.39,2,2-.31.81-1.8,1.52-4.34,1a9.86,9.86,0,0,1,0,3,4.07,4.07,0,0,1-4-3C8.25,10.5,4.93,8.68,5,8c.88-.61,2-1.83,3-2A2.82,2.82,0,0,1,7,5Z" />
        <rect width="24" height="24" fill="none" />
      </g>
    </svg>
  );
};

export default TomatoIcon;
