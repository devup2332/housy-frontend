import EmailIcon from "@/components/Icons/EmailIcon";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import LoaderIcon from "@/components/Icons/LoaderIcon";
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
import { useSignIn, useSignUp } from "@clerk/clerk-react";
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
];
const Step1 = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { signUp } = useSignUp();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerStepOneSchema),
  });
  const registerGoogle = async () => {
    signUp?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
      continueSignUp: true,
    });
  };
  const continueForm = async (data: RegisterSchemaStepOneType) => {
    try {
      setLoading(true);
      dispatch(setRegisterData({ email: data.email }));
      navigate("/register/step2");
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
          const Icon = control.icon!;
          return (
            <FormControl
              key={name}
              Icon={
                <Icon
                  className={cn(
                    "w-6 h-6 text-text-2 stroke-current",
                    error && "text-red-500",
                  )}
                />
              }
              placeholder={t(placeholder)}
              name={name}
              register={register}
              error={error}
              label={t(label)}
              type={type}
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
