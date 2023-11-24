import { Skeleton } from "@mui/material";

const Skeleton_Rolodex_card_image = () => {
  return (
    <div
      className={`flex justify-center items-center w-[120px] h-[120px] rounded-full overflow-hidden mb-4`}>
      <Skeleton variant="circular" width={120} height={120} animation="wave" />
    </div>
  );
};

export default Skeleton_Rolodex_card_image;
