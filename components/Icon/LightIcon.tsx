import SVGIconBase, { SvgIconProps } from "../SVGIconBase";

const LightIcon = (props: SvgIconProps) => {
  return (
    <SVGIconBase {...props}>
      <path
        fill="none"
        d="M21.752 15.002C20.5633 15.4975 19.2879 15.7518 18 15.75C12.615 15.75 8.25 11.385 8.25 6.00005C8.25 4.67005 8.516 3.40305 8.998 2.24805C7.22147 2.98916 5.70397 4.2394 4.63663 5.8413C3.56928 7.44321 2.99984 9.32513 3 11.25C3 16.635 7.365 21 12.75 21C14.6749 21.0002 16.5568 20.4308 18.1587 19.3634C19.7606 18.2961 21.0109 16.7786 21.752 15.002Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </SVGIconBase>
  );
};

export default LightIcon;
