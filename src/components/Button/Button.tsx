import { Button as AntdButton, Spin } from "antd";
import { ButtonProps } from "antd/es/button/button";
import classnames from "classnames";

export default function Button({
  children,
  variant,
  className,
  loading,
  ...props
}: ButtonProps & {
  variant?: "green" | "gray" | "excel-export" | "primary" | "white";
  className?: string;
  loading?: boolean;
}) {
  return (
    <AntdButton
      type="primary"
      disabled={loading}
      className={classnames(
        "flex items-center justify-center text-base",
        {
          "bg-primary": variant === "primary",
          "bg-green-500 hover:!bg-green-600": variant === "green",
          "bg-gray-500 hover:!bg-gray-600": variant === "gray",
          "!bg-white !text-primary hover:!bg-gray-100 hover:!text-primary":
            variant === "white",
          "bg-[#107c41] hover:!bg-[#21a366]": variant === "excel-export",
          "cursor-not-allowed !opacity-50": loading,
        },
        className,
      )}
      {...props}
    >
      {children}
      {loading && <Spin className="ml-2" />}
    </AntdButton>
  );
}
