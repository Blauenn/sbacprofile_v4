import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { AnnouncementInterface } from "../interfaces/common.interface";
import fade_transition from "../animations/fade_transition.transition";
// Contexts //
import { useContext_Announcements } from "../contexts/Announcement.context";
// Components //
import Home_announcements from "../components/Home/Home_announcements.component";

const Home = () => {
  const { announcements, fetchAnnouncements } = useContext_Announcements();
  const [latestAnnouncement, setLatestAnnouncement] =
    useState<AnnouncementInterface>();

  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      fetchAnnouncements();

      if (announcements.status) {
        const sortedAnnouncements = announcements.result.sort(
          (a: AnnouncementInterface, b: AnnouncementInterface) => {
            const dateA = dayjs(a.announcement_create_datetime);
            const dateB = dayjs(b.announcement_create_datetime);

            return dateB.valueOf() - dateA.valueOf();
          },
        );

        setLatestAnnouncement(sortedAnnouncements[0]);
      }
    };

    fetchLatestAnnouncement();
  }, [announcements]);

  const { t } = useTranslation("page_home");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="mb-4 text-4xl font-semibold">SBAC Profile</h1>
        <h1 className="text-xl">{t("welcome_message")}</h1>
      </div>
      {announcements.status && latestAnnouncement ? (
        <Home_announcements latestAnnouncement={latestAnnouncement} />
      ) : null}
    </div>
  );
};

export default fade_transition(Home);
