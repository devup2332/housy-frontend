import type { ComponentProps } from "react";
import type { IconProps } from "./svg";

export type FieldControl<T> = {
  name: T;
  label: string;
  type: ComponentProps<"input">["type"];
  placeholder: string;
  icon?: React.FC<IconProps>;
};
