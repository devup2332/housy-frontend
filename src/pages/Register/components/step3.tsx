import CloseEyeIcon from "@/components/Icons/CloseEyeIcon";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import FormControl from "@/components/UI/FormControl";
import {
  registerStepThreeSchema,
  type RegisterSchemaFieldsStepThree,
  type RegisterSchemaStepThreeType,
} from "@/schemas/registerSchema";
import { useAppDispatch } from "@/store/hooks";
import { setRegisterData } from "@/store/slices/RegisterSlice";
import type { FieldControl } from "@/types/controls";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "housy-lib";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const controls: FieldControl<RegisterSchemaFieldsStepThree>[] = [
  {
    name: "password",
    type: "password",
    label: "register.step3.form.password.label",
    placeholder: "register.step3.form.password.placeholder",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "register.step3.form.confirmPassword.label",
    placeholder: "register.step3.form.confirmPassword.placeholder",
  },
];

const Step3 = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(registerStepThreeSchema),
  });

  const finishRegister = (data: RegisterSchemaStepThreeType) => {
    try {
      dispatch(
        setRegisterData({
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      );
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="grid gap-3">
        <h1 className="text-center text-text-1 text-2xl font-bold">
          {t("register.step3.form.title")}
        </h1>
        <p className="text-center text-sm text-text-2">
          {t("register.step3.form.description")}
        </p>
      </div>
      <form className="grid gap-6" onSubmit={handleSubmit(finishRegister)}>
        {controls.map((control) => {
          const { placeholder, name, label } = control;
          const error = errors[name] ? t(errors[name].message!) : "";
          const Icon =
            name === "password"
              ? showPassword
                ? OpenEyeIcon
                : CloseEyeIcon
              : undefined;
          return (
            <FormControl
              key={name}
              placeholder={t(placeholder)}
              name={name}
              Icon={
                Icon && (
                  <Icon
                    className={cn(
                      "w-6 h-6 text-text-2 stroke-current cursor-pointer",
                      error && "text-red-500",
                    )}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
              register={register}
              error={error}
              label={t(label)}
              type={showPassword ? "text" : "password"}
            />
          );
        })}
        <Button
          variant="filled"
          className="bg-primary w-full font-semibold hover:bg-primary/90"
          type="submit"
          disabled={loading}
        >
          {loading && <LoaderIcon className="animate-spin" />}
          {t("register.step3.form.button.text")}
        </Button>
      </form>
    </>
  );
};

export default Step3;
