import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen bg-bg-1">
      <div>
        <h1 className="text-center text-text-1 text-2xl font-bold">
          {t("login.title")}
        </h1>
        <p className="text-center text-text-2">{t("login.description")}</p>
      </div>
    </div>
  );
};

export default Login;
