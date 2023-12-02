import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import fade_transition from "../animations/fade_transition.transition";
// Functions //
import { handle_input_change } from "../functions/fields.function";
import { handleLogin } from "../functions/account/login.function";
// Constants //
import { hover_transition } from "../constants/styles/transition.style";

interface CurrentComponentProp {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setUserInfo: any;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: CurrentComponentProp) => {
  const { setAccessToken, setUserInfo, setIsLoggedIn } = props;

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const [loginObject, setLoginObject] = useState({
    login_email: "",
    login_password: "",
  });

  const { t } = useTranslation("page_login");

  return (
    <div>
      <div className="flex justify-center">
        <div className="p-8 mt-8 bg-white border border-opacity-25 border-standardBlack rounded-xl">
          <h1 className="mb-8 text-3xl font-semibold">{t("title")}</h1>
          <form
            id="login_form"
            onSubmit={(event) => {
              handleLogin(
                event,
                loginObject,
                setAccessToken,
                setUserInfo,
                setIsLoggingIn,
                setIsLoggedIn,
                setIsLoginFailed,
              );
            }}
            className="flex w-[256px] flex-col items-center sm:w-[512px]"
          >
            <div className="flex flex-col items-center w-full gap-4">
              <TextField
                label={t("label_email")}
                value={loginObject.login_email}
                onChange={(event) => {
                  handle_input_change(event, loginObject, setLoginObject);
                }}
                name="login_email"
                className="w-full"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
              <TextField
                label={t("label_password")}
                value={loginObject.login_password}
                onChange={(event) => {
                  handle_input_change(event, loginObject, setLoginObject);
                }}
                name="login_password"
                type="password"
                className="w-full"
                InputProps={{ sx: { borderRadius: 3 } }}
              />
              {isLoginFailed ? (
                <div className="flex justify-start w-full mb-4">
                  <h1 className="text-lg font-semibold">
                    <i className="text-red-500 fa-solid fa-circle-exclamation me-2"></i>
                    {t("invalid_credentials_message")}
                  </h1>
                </div>
              ) : null}
              <div className="flex justify-start w-full">
                <button
                  className={`${
                    isLoggingIn ||
                    loginObject.login_email == "" ||
                    loginObject.login_password == ""
                      ? "bg-gray-500 text-white"
                      : "border border-primary text-primary hover:bg-primary hover:text-white"
                  } w-full rounded-full px-6 py-2 sm:w-1/2 ${hover_transition}`}
                  disabled={
                    isLoggingIn ||
                    loginObject.login_email == "" ||
                    loginObject.login_password == ""
                  }
                  type="submit"
                >
                  {t("submit_button_title")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default fade_transition(Login);
