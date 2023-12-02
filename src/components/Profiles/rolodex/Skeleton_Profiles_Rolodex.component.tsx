import { Skeleton } from "@mui/material";
import fade_transition from "../../../animations/fade_transition.transition";
// Functions //
import { randomize_length } from "../../../functions/randomize.function";
// Components //
import Skeleton_Profiles_Rolodex_card from "../rolodex/card/Skeleton_Profiles_Rolodex_card.component";

const Skeleton_Profiles_Rolodex = () => {
  return (
    <div className="flex flex-col gap-14">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-6">
          <h1 className="text-xl font-semibold lg:text-2xl xl:mx-16">
            <Skeleton width={120} animation="wave" />
          </h1>
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4 xl:mx-16 2xl:grid-cols-6">
            {[...Array(randomize_length(2, 20))].map((_, index) => (
              <Skeleton_Profiles_Rolodex_card key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default fade_transition(Skeleton_Profiles_Rolodex);
