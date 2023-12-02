import { useTranslation } from "react-i18next";
import Dashboard_button from "../Dashboard_button.component";
import { buttons_list_layout } from "../../../../constants/styles/dashboard/quick_access_buttons_list.constant";

const Dashboard_quickAccess_buttons_studentsTeachers = () => {
  const { t } = useTranslation("page_dashboard");

  return (
    <div className={buttons_list_layout}>
      {/* Leave notices */}
      <Dashboard_button
        url="/leaveNotices"
        color="text-red-500"
        icon="fa-solid fa-flag"
        title={t("button_title_leaveNotices")}
        description={t("button_description_leaveNotices")}
      />
      {/* Request forms */}
      <Dashboard_button
        url="/requestForms"
        color="text-blue-500"
        icon="fa-solid fa-folder"
        title={t("button_title_requestForms")}
        description={t("button_description_requestForms")}
      />
    </div>
  );
};

export default Dashboard_quickAccess_buttons_studentsTeachers;
