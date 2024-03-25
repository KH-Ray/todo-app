import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export default function IconCheck(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth={2}
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
}
