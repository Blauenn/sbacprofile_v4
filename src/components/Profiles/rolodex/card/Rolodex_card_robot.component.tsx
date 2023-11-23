import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

const Rolodex_card_robot = () => {
  const { t } = useTranslation("profile_rolodex");

  return (
    <Tooltip title={t("artificial_user_message")} placement="bottom" arrow>
      <div className="absolute left-4 font-semibold opacity-50">
        <i className="fa-solid fa-robot me-2"></i>
      </div>
    </Tooltip>
  );
};

export default Rolodex_card_robot;
