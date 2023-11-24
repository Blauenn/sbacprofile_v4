import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
// Functions //
import { fetch_user_image } from "../../../functions/fetch/fetch_user.function";
// Contexts //
import { useContext_Account } from "../../../contexts/Account.context";
// Components //
import Sidebar_link from "./Sidebar_link.component";
import Sidebar_modal_logout from "./modal/Sidebar_modal_logout.component";
// Constants //
import { background_color_from_major } from "../../../constants/styles/colors/color_from_major.constant";
import { default_image } from "../../../constants/styles/miscellaneous/default_image.constant";
import { hover_transition } from "../../../constants/styles/transition.style";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

// Tailwind classes //
const sidebar_parent =
  "fixed flex justify-center h-full w-12 bg-standard_black";
const sidebar_first_child = "flex justify-between h-5/6";
const sidebar_second_child = "flex justify-between flex-col";
const sidebar_ul = "flex flex-col h-full py-5 list-none";
const sidebar_li = "flex justify-center sidebar-links";
const sidebar_i = "text-2xl text-white opacity-50 hover:opacity-100";

const Sidebar = () => {
  const { accessToken, userInfo } = useContext_Account();

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");

    if (!storedProfileImage) {
      fetch_user_image(accessToken, setProfileImage);
    } else {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const onLogoutModalClose = () => {
    setLogoutModalOpen(false);
  };

  const { t } = useTranslation("sidebar");

  return (
    <div className={sidebar_parent}>
      <nav className={sidebar_first_child}>
        <div className={sidebar_second_child}>
          <ul className={sidebar_ul}>
            {/* Home */}
            <Sidebar_link
              title={t("home")}
              to="/home"
              icon="fa-solid fa-home"
              margin="mb-4"
            />
            {/* Announcements */}
            <Sidebar_link
              title={t("announcements")}
              to="/announcements"
              icon="fa-solid fa-bullhorn"
              margin=""
            />

            {userInfo ? (
              /* User dashboard */
              <li className={`${sidebar_li} mx-1 mt-auto`}>
                <Tooltip
                  title={<h1 className="p-1 text-sm">{t("dashboard")}</h1>}
                  placement="right"
                  arrow
                  disableInteractive
                >
                  <NavLink to="/dashboard">
                    <div
                      className={`${
                        background_color_from_major[userInfo.profile_major]
                      } overflow-hidden rounded-full`}
                    >
                      <img
                        src={`${CDN_ENDPOINT}${profileImage}`}
                        onError={(e) => {
                          e.currentTarget.src = default_image;
                        }}
                      />
                    </div>
                  </NavLink>
                </Tooltip>
              </li>
            ) : (
              <li className={`${sidebar_li} mt-auto`}>
                <div className="h-[30px] w-[30px] rounded-full bg-white opacity-50"></div>
              </li>
            )}

            {/* Teachers */}
            <Sidebar_link
              title={t("teachers")}
              to="/teachers"
              icon="fa-solid fa-chalkboard-user"
              margin="mt-auto mb-4"
            />
            {/* Students */}
            <Sidebar_link
              title={t("students")}
              to="/students"
              icon="fa-solid fa-graduation-cap"
              margin="mb-8"
            />

            {/* Settings */}
            <Sidebar_link
              title={t("settings")}
              to="/settings"
              icon="fa-solid fa-gear"
              margin="mt-auto mb-4"
            />
            {/* Logout button */}
            <li className={`${sidebar_li}`}>
              <Tooltip
                title={<h1 className="p-1 text-sm">{t("logout")}</h1>}
                placement="right"
                arrow
                disableInteractive
              >
                <i
                  onClick={() => {
                    setLogoutModalOpen(true);
                  }}
                  className={`fa-solid fa-right-from-bracket rotate-180 cursor-pointer ${sidebar_i} ${hover_transition}`}
                ></i>
              </Tooltip>
              <Sidebar_modal_logout
                open={logoutModalOpen}
                onModalClose={onLogoutModalClose}
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
