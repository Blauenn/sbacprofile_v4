import { Skeleton } from "@mui/material";
// Constants //
import { hover_transition } from "../../../constants/styles/transition.style";

const Skeleton_Announcements_rolodex_card = () => {
  return (
    <div
      className={`w-full rounded-xl bg-white shadow-sm ${hover_transition} cursor-pointer hover:bg-slate-200`}
    >
      <div className="flex flex-col h-full gap-2 md:flex-row">
          <div className={`flex h-full items-center`}>
            <Skeleton width={320} animation="wave" />
          </div>
        <div className="flex flex-col justify-between gap-4 p-4 md:p-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold md:text-3xl">
              <Skeleton width={280} animation="wave" />
            </h1>
            <h1 className="text-lg mx:text-xl line-clamp-2">
            <Skeleton width={220} animation="wave" />
            </h1>
          </div>
            <h1 className="opacity-50 text-md">
              <i className="fa-regular fa-clock me-2"></i>
              <Skeleton width={180} animation="wave" />
            </h1>
        </div>
      </div>
    </div>
  );
};

export default Skeleton_Announcements_rolodex_card;
