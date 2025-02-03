import { ReactElement } from "react";

interface Props {
  variant?: "primary" | "secondary";
  text: string;
  loading?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  widthFull?: boolean;
  style?: string;
  onClick?: any
}

const buttonVariants = {
  primary: "bg-primaryBtn-bg text-primaryBtn-txt",
  secondary: "bg-secondaryBtn-bg text-secondaryBtn-txt",
};

const defaultStyle =
  "flex items-center justify-center font-poppins rounded-lg gap-3 cursor-pointer";

const loadingStyle = "cursor-progress";

const Button = ({
  variant = "primary",
  text,
  loading = false,
  startIcon,
  endIcon,
  widthFull = false,
  style,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonVariants[variant]} ${defaultStyle} ${widthFull? "w-full h-full": "px-8 py-4"} ${style} ${
        loading && loadingStyle
      }`}
    >
      {loading ? null : startIcon ? <span className="size-9">{startIcon}</span> : null}
      {loading ? "Loading..." : text}
      {loading ? null : (endIcon ? <span className="size-9">{endIcon}</span> : null)}
    </button>
  );
};

export default Button;
