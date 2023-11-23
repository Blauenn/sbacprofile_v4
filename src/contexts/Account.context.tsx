import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserInfoInterface } from "../interfaces/account.interface";

// Type //
type AccountContextType = {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  userInfo: UserInfoInterface;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoInterface>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
type AccountContextProviderProps = {
  children: ReactNode;
};

// Context //
const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function useContext_Account() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useContext_Account is not used within its provider");
  }
  return context;
}

export function AccountContextProvider({
  children,
}: Readonly<AccountContextProviderProps>) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfoInterface>({
    primary_profile_ID: 0,
    profile_position: 0,
    profile_ID: 0,
    profile_first_name: "",
    profile_last_name: "",
    profile_nickname: "",
    profile_first_name_thai: "",
    profile_last_name_thai: "",
    profile_nickname_thai: "",
    profile_gender: 0,
    profile_major: 0,
    profile_level: 0,
    profile_class: 0,
    profile_phone: "",
    profile_email: "0",
    profile_line_ID: "",
    profile_image: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,

      userInfo,
      setUserInfo,

      isLoggedIn,
      setIsLoggedIn,
    }),
    [
      accessToken,
      setAccessToken,

      userInfo,
      setUserInfo,

      isLoggedIn,
      setIsLoggedIn,
    ]
  );

  useEffect(() => {
    setUserInfo({
      primary_profile_ID: 1,
      profile_position: 1,
      profile_ID: 17903,
      profile_first_name: "Nawee",
      profile_last_name: "Taegook",
      profile_nickname: "Nawee",
      profile_first_name_thai: "นาวี",
      profile_last_name_thai: "แทกุ๊ก",
      profile_nickname_thai: "นาวี",
      profile_gender: 1,
      profile_major: 6,
      profile_level: 3,
      profile_class: 3,
      profile_phone: "0999999999",
      profile_email: "nawee.tae@sbacnon.ac.th",
      profile_line_ID: "orurio345",
      profile_image: "/assets/profilePic/students/17903_nawee.png",
    });
  }, []);

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
}
