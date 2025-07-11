import { cn } from "@/utils/cn";
import { Input, Textarea } from "gestora-lib";
import type { ComponentProps, JSX } from "react";
import { Control, Controller, type UseFormRegister } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "gestora-lib";

interface Props extends ComponentProps<"input"> {
  Icon?: JSX.Element;
  label: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  control?: Control<any>;
  options?: { value: string; label: string }[];
}

const FormControl = ({
  Icon,
  type,
  placeholder,
  label,
  name = "",
  register,
  error,
  className,
  control,
  options,
}: Props) => {
  return (
    <div className={cn("grid gap-2 w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "text-text-1 text-sm font-medium",
            error && "text-red-500"
          )}
        >
          {label}
        </label>
      )}
      {["text", "password", "number", "email"].includes(type as string) ? (
        <Input
          containerClassName={cn(
            "border-border-1 w-full max-w-none",
            error && "border-red-500"
          )}
          inputClassName={cn(
            "text-text-1 placeholder:text-text-2 w-full",
            error && "placeholder:text-red-500"
          )}
          Icon={Icon}
          type={type}
          placeholder={placeholder}
          id={name}
          {...register(name)}
        />
      ) : type === "select" ? (
        <Controller
          name={name}
          control={control}
          rules={{
            required: {
              value: true,
              message: error!,
            },
          }}
          render={({ field }) => {
            return (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    "w-full col-span-2 border-border-1 data-[size=default]:h-10 text-text-1",
                    error &&
                      "border-red-500 *:data-[slot=select-value]:text-red-500"
                  )}
                >
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => {
                    const { label, value } = option;
                    return (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            );
          }}
        />
      ) : type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          id={name}
          className={cn(
            "w-full h-32",
            error && "border-red-500 placeholder:text-red-500"
          )}
          {...register(name)}
        />
      ) : null}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormControl;
