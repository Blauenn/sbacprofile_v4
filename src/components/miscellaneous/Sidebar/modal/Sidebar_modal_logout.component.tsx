import { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Fade, Modal } from "@mui/material";
// Functions //
import { logout } from "../../../../functions/account/logout.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: () => void;
}

const modal = document.getElementById("modal");

const Sidebar_modal_logout = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { setAccessToken, setUserInfo, setIsLoggedIn } = useContext_Account();

  const [shouldClear, setShouldClear] = useState(true);
  
  const { t } = useTranslation("sidebar");

  return modal
    ? createPortal(
        <Modal
          open={open}
          onClose={onModalClose}
          className="flex justify-center items-center"
          sx={{ backdropFilter: "blur(2px)" }}>
          <Fade in={open}>
            <div className="mx-4 sm:w-auto sm:mx-0 flex items-center flex-col sm:flex-row bg-white rounded-xl">
              <div className="px-4 py-8">
                <h1 className="text-3xl font-semibold mb-4">
                  <i className="fa-solid fa-right-from-bracket rotate-180 me-4"></i>
                  {t("logout_title")}
                </h1>
                <h1 className="text-xl opacity-50 mb-8">{t("logout_message")}</h1>
                <div className="flex flex-row justify-end gap-4 w-full">
                  <button
                    onClick={() => {
                      logout(
                        setAccessToken,
                        setUserInfo,
                        setIsLoggedIn,
                        shouldClear,
                        setShouldClear
                      );
                    }}
                    className="border border-red-500 text-red-500 text-lg rounded-xl px-4 py-2">
                    {t("logout_confirm_button_title")}
                  </button>
                  <button
                    onClick={onModalClose}
                    className="bg-red-500 text-white text-lg rounded-xl px-4 py-2">
                    {t("logout_cancel_button_title")}
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>,
        modal
      )
    : null;
};

export default Sidebar_modal_logout;
