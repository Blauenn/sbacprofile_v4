import { Tooltip } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { AnnouncementInterface } from "../../../interfaces/common.interface";
// Functions //
import { change_to_locale_date, change_to_date } from "../../../functions/dates.function";
// Constants //
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { hover_transition } from "../../../constants/styles/transition.style";

interface CurrentComponentProp {
  announcement: AnnouncementInterface;
}

const Announcements_rolodex_card = (props: CurrentComponentProp) => {
  const { announcement } = props;

  return (
    <div
      key={announcement.announcement_ID}
      className={`w-full rounded-xl bg-white shadow-sm ${hover_transition} cursor-pointer hover:bg-slate-200`}
    >
      <div className="flex flex-col h-full gap-2 md:flex-row">
        {announcement.announcement_image !== "/assets/files/announcements/" ? (
          <div className={`flex h-full items-center`}>
            <img
              src={`${CDN_ENDPOINT}${announcement.announcement_image}`}
              className="rounded-xl border md:max-w-[320px]"
            />
          </div>
        ) : null}
        <div className="flex flex-col justify-between gap-4 p-4 md:p-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold md:text-3xl">
              {announcement.announcement_title}
            </h1>
            <h1 className="text-lg mx:text-xl line-clamp-2">
              {announcement.announcement_description}
            </h1>
          </div>
          <Tooltip
            title={change_to_locale_date(
              announcement.announcement_create_datetime,
            )}
            placement="top-start"
            arrow
          >
            <h1 className="opacity-50 text-md">
              <i className="fa-regular fa-clock me-2"></i>
              {formatDistanceToNow(
                change_to_date(announcement.announcement_create_datetime),
                { addSuffix: true },
              ).replace("about ", "")}
            </h1>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Announcements_rolodex_card;
