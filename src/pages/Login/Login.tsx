import GoogleIcon from "@/components/Icons/GoogleIcon";
import Or from "@/components/UI/Or";
import { useTranslation } from "react-i18next";
import { Button } from "housy-lib";
import { useForm } from "react-hook-form";
import FormControl from "@/components/UI/FormControl";
import { Link } from "react-router";
import EmailIcon from "@/components/Icons/EmailIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import { useState, type ComponentProps } from "react";
import CloseEyeIcon from "@/components/Icons/CloseEyeIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchemaFields,
  type LoginSchemaType,
} from "@/schemas/loginSchema";
import { cn } from "@/utils/cn";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import { sleep } from "@/utils/sleep";
import WorldIcon from "@/components/Icons/WorldIcon";
import SunIcon from "@/components/Icons/SunIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/reducers/ThemeReducer";
import MoonIcon from "@/components/Icons/MoonIcon";
import { LANGUAGE_KEY } from "@/providers/TranslationProvider";

type Field = {
  name: LoginSchemaFields;
  label: string;
  type: ComponentProps<"input">["type"];
  placeholder: string;
  icon?: React.FC;
};

const fields: Field[] = [
  {
    name: "email",
    label: "login.form.email.label",
    type: "email",
    placeholder: "login.form.email.placeholder",
    icon: EmailIcon,
  },
  {
    name: "password",
    label: "login.form.password.label",
    type: "password",
    placeholder: "login.form.password.placeholder",
  },
];

const Login = () => {
  const { t, i18n } = useTranslation();
  const dispath = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.currentTheme);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const handleLogin = async (data: LoginSchemaType) => {
    setLoading(true);
    await sleep(2000);
    console.log({ data });
    Object.entries(data).forEach(([, value]) => {
      value.trim();
    });
    setLoading(false);
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen bg-bg-1 lg:bg-bg-2 grid place-items-center">
      <div className="w-10/12 grid gap-6 max-w-sm lg:bg-bg-1 p-4 lg:max-w-[480px] lg:px-14 lg:rounded-xl lg:py-14">
        <h1 className="text-center text-text-1 text-2xl font-bold">
          {t("login.title")}
        </h1>
        <p className="text-center text-sm text-text-2">
          {t("login.description")}
        </p>
        <Button
          className="font-semibold w-full border-border-1 text-text-1 hover:bg-bg-2/30"
          variant="outlined"
        >
          <GoogleIcon className="w-6 h-6 mr-2" />
          {t("login.buttons.google")}
        </Button>

        <Or text={t("login.or")} />
        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-6">
          {fields.map((field) => {
            const { placeholder, name, label, icon, type } = field;
            const Icon = icon
              ? icon
              : showPassword
                ? OpenEyeIcon
                : CloseEyeIcon;
            const error = errors[name] ? t(errors[name].message!) : "";
            return (
              <FormControl
                key={name}
                Icon={
                  <Icon
                    onClick={() => {
                      if (name === "password") setShowPassword(!showPassword);
                    }}
                    className={cn(
                      "w-6 h-6  text-text-2 stroke-current",
                      error && "text-red-500",
                      name === "password" && "cursor-pointer",
                    )}
                  />
                }
                placeholder={t(placeholder)}
                name={name}
                register={register}
                error={error}
                label={t(label)}
                type={
                  name === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
              />
            );
          })}
          <Link
            to="/forgotPassword"
            className="text-primary font-semibold text-sm w-fit"
          >
            {t("login.forgotPassword")}
          </Link>
          <Button
            variant="filled"
            className="bg-primary font-semibold hover:bg-primary/90"
            type="submit"
          >
            {loading && <LoaderIcon className="animate-spin" />}
            {t("login.form.button.text")}
          </Button>
          <p className="text-sm font-normal text-text-1 text-center">
            {t("login.register.question")}
            <Link to="/register" className="text-primary ml-2 font-bold">
              {t("login.register.link")}
            </Link>
          </p>
        </form>
      </div>

      <div className="flex gap-4 items-center absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button
          onClick={() => {
            const l = i18n.language === "es" ? "en" : "es";
            i18n.changeLanguage(l);
            localStorage.setItem(LANGUAGE_KEY, l);
          }}
          variant="icon"
          className="p-0 hover:bg-bg-2"
        >
          <WorldIcon className="w-6 h-6 text-text-1 stroke-current" />
        </Button>
        <Button
          variant="icon"
          className="p-0 hover:bg-bg-2"
          onClick={() =>
            dispath(
              setTheme({ currentTheme: theme === "dark" ? "light" : "dark" }),
            )
          }
        >
          {theme === "dark" ? (
            <SunIcon className="w-6 h-6 text-text-1 stroke-current" />
          ) : (
            <MoonIcon className="w-6 h-6 text-text-1 stroke-current" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Login;
