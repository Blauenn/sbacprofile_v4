import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 mt-16">
      <i className="text-6xl fa-solid fa-spinner animate-spin text-primary"></i>
      <h1 className="text-xl opacity-50">{t("loading_message")}</h1>
    </div>
  );
};

export default Loading;
