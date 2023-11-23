import { useTranslation } from "react-i18next";
import fade_transition from "../animations/fade_transition.transition";

const Home = () => {
  const { t } = useTranslation("page_home");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold mb-4">SBAC Profile</h1>
        <h1 className="text-xl">{t("welcome_message")}</h1>
      </div>
    </div>
  );
};

export default fade_transition(Home);
