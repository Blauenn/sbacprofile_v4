import { Skeleton } from "@mui/material";
// Components //
import Skeleton_Rolodex_card_image from "./Skeleton_Rolodex_card_image.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";

const rolodex_card_style = `relative flex items-center flex-col bg-white shadow-sm rounded-xl py-4 | ${hover_transition} hover:bg-slate-200 cursor-pointer`;

const Skeleton_Rolodex_card = () => (
  <div className={`${rolodex_card_style}`}>
    {/* If the user is artificial. */}
    <div className="w-full flex flex-col justify-center items-center py-2">
      <Skeleton_Rolodex_card_image />
      <div className="w-5/6">
        <h1 className="text-2xl text-center truncate block">
          <Skeleton animation="wave" />
        </h1>
      </div>
    </div>
  </div>
);

export default Skeleton_Rolodex_card;
