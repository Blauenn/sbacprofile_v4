import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { API_ENDPOINT } from "../constants/ENDPOINTS";
import { AnnouncementInterface } from "../interfaces/common.interface";
import axios from "axios";

interface AnnouncementContextInterface {
  status: boolean;
  result: AnnouncementInterface[];
}

// Type //
type AnnouncementsContextType = {
  announcements: AnnouncementContextInterface;
  setAnnouncements: React.Dispatch<
    React.SetStateAction<AnnouncementContextInterface>
  >;
  fetchAnnouncements: () => void;
};
type AnnouncementsContextProviderProps = {
  children: ReactNode;
};

// Context //
const AnnouncementsContext = createContext<
  AnnouncementsContextType | undefined
>(undefined);

export function useContext_Announcements() {
  const context = useContext(AnnouncementsContext);
  if (context === undefined) {
    throw new Error("useContext_Announcements is not used within its provider");
  }
  return context;
}

export function AnnouncementsContextProvider({
  children,
}: Readonly<AnnouncementsContextProviderProps>) {
  const [announcements, setAnnouncements] =
    useState<AnnouncementContextInterface>({
      status: false,
      result: [],
    });

  const fetchAnnouncements = async (force?: boolean) => {
    if (force || announcements.result.length === 0) {
      try {
        const response: { data: AnnouncementContextInterface } =
          await axios.get(`${API_ENDPOINT}/api/v1/announcement/getAll`);

        setAnnouncements(response.data);
      } catch (error) {
        setAnnouncements({
          status: false,
          result: [],
        });
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      announcements,
      setAnnouncements,
      fetchAnnouncements,
    }),
    [announcements, setAnnouncements],
  );

  return (
    <AnnouncementsContext.Provider value={contextValue}>
      {children}
    </AnnouncementsContext.Provider>
  );
}
