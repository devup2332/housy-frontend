import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const variants = cva(
  "h-10 rounded-md transition-colors cursor-pointer flex gap-2 items-center justify-center outline-none text-sm",
  {
    variants: {
      variant: {
        primary: "bg-primary text-text-3 hover:bg-primary/80",
        ghost: "bg-host text-text-3 hover:bg-host/80",
        outline: "border-[1px] border-border-1  text-text-1 hover:bg-bg-2/60",
      },
    },
  },
);

interface Props
  extends ComponentProps<"button">,
    VariantProps<typeof variants> {}

const Button = ({
  children,
  className,
  variant = "primary",
  ...other
}: Props) => {
  return (
    <button className={cn(variants({ variant, className }))} {...other}>
      {children}
    </button>
  );
};

export default Button;
