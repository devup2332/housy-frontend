import MoonIcon from "@/components/Icons/MoonIcon";
import SunIcon from "@/components/Icons/SunIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { LANGUAGE_KEY } from "@/providers/TranslationProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/ThemeSlice";
import { Button } from "housy-lib";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

const Register = () => {
  const { i18n } = useTranslation();
  const dispath = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.currentTheme);
  return (
    <div className="h-screen bg-bg-1 lg:bg-bg-2 grid place-items-center">
      <div className="w-10/12 grid gap-6 max-w-sm lg:bg-bg-1 p-4 lg:max-w-[480px] lg:px-14 lg:rounded-xl lg:py-14 lg:shadow-lg lg:shadow-shadow-1 2xl:py-20">
        <Outlet />
      </div>
      <div className="flex gap-4 items-center absolute bottom-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-6 lg:bottom-6">
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

export default Register;
