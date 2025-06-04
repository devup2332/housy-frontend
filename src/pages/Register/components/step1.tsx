import CloseEyeIcon from "@/components/Icons/CloseEyeIcon";
import EmailIcon from "@/components/Icons/EmailIcon";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import FormControl from "@/components/UI/FormControl";
import Or from "@/components/UI/Or";
import {
  registerStepOneSchema,
  type RegisterSchemaFieldsStepOne,
  type RegisterSchemaStepOneType,
} from "@/schemas/registerSchema";
import { useAppDispatch } from "@/store/hooks";
import { setRegisterData } from "@/store/slices/RegisterSlice";
import type { FieldControl } from "@/types/controls";
import { cn } from "@/utils/cn";
import { loginWithGoogle, supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "housy-lib";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

const controls: FieldControl<RegisterSchemaFieldsStepOne>[] = [
  {
    name: "email",
    type: "email",
    label: "register.step1.form.email.label",
    placeholder: "register.step1.form.email.placeholder",
    icon: EmailIcon,
  },
  {
    name: "password",
    type: "password",
    label: "register.step1.form.password.label",
    placeholder: "register.step1.form.password.placeholder",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "register.step1.form.confirmPassword.label",
    placeholder: "register.step1.form.confirmPassword.placeholder",
  },
];
const Step1 = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerStepOneSchema),
  });
  const registerGoogle = () => loginWithGoogle("/register/fullName");
  const continueForm = async (data: RegisterSchemaStepOneType) => {
    try {
      const { email, password } = data;
      setLoading(true);
      dispatch(setRegisterData({ email: data.email }));
      await supabase.auth.signUp({
        password,
        email,
      });

      navigate("/register/fullName");
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
          {t("register.step1.form.title")}
        </h1>
        <p className="text-center text-sm text-text-2">
          {t("register.step1.form.description")}
        </p>
      </div>
      <Button
        className="font-semibold w-full border-border-1 text-text-1 hover:bg-bg-2/30"
        variant="outlined"
        onClick={registerGoogle}
      >
        <GoogleIcon className="w-6 h-6 mr-2" />
        {t("register.step1.social.google")}
      </Button>
      <Or text={t("register.step1.or")} />
      <form className="grid gap-6" onSubmit={handleSubmit(continueForm)}>
        {controls.map((control) => {
          const { placeholder, name, label, type } = control;
          const error = errors[name] ? t(errors[name].message!) : "";
          const isPasswordControl =
            name === "password" || name === "confirmPassword";
          const Icon =
            name === "password"
              ? showPassword
                ? OpenEyeIcon
                : CloseEyeIcon
              : control.icon;
          return (
            <FormControl
              key={name}
              Icon={
                Icon && (
                  <Icon
                    className={cn(
                      "w-6 h-6 text-text-2 stroke-current ",
                      isPasswordControl && "cursor-pointer",
                      error && "text-red-500",
                    )}
                    onClick={() =>
                      name === "password" && setShowPassword(!showPassword)
                    }
                  />
                )
              }
              placeholder={t(placeholder)}
              name={name}
              register={register}
              error={error}
              label={t(label)}
              type={
                isPasswordControl ? (showPassword ? "text" : "password") : type
              }
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
          {t("register.step1.form.button.text")}
        </Button>
        <p className="text-sm text-text-1 text-center">
          {t("register.step1.form.question.text")}
          <Link to="/login" className="text-primary font-semibold ml-2">
            {t("register.step1.form.question.link")}
          </Link>
        </p>
      </form>
    </>
  );
};

export default Step1;
