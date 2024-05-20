import { Button as AntdButton } from "antd";
import { ButtonProps } from "antd/es/button/button";
import classnames from "classnames";

export default function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps & {
  variant?: "green" | "gray" | "excel-export" | "primary" | "white";
}) {
  return (
    <AntdButton
      type="primary"
      className={classnames(
        {
          "bg-primary": variant === "primary",
          "bg-green-500 hover:!bg-green-600": variant === "green",
          "bg-gray-500 hover:!bg-gray-600": variant === "gray",
          "bg-white text-primary hover:!bg-gray-100 hover:!text-primary":
            variant === "white",
          "bg-[#107c41] hover:!bg-[#21a366]": variant === "excel-export",
        },
        className,
      )}
      {...props}
    >
      {children}
    </AntdButton>
  );
}
