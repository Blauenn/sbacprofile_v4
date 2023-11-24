import { useTranslation } from "react-i18next";
import PageHeader from "../components/miscellaneous/common/PageHeader.component";

const Announcements = () => {
    const { t } = useTranslation("page_announcements");

  return (
    <>
      <PageHeader
        icon="fa-solid fa-bullhorn"
        text={t("header")}
      />

      {/* <Announcements_rolodex /> */}
    </>
  )
}

export default Announcements;