import { Skeleton } from "@mui/material";

const Skeleton_Clubs_rolodex_card = () => {
	return (
		<div
			className={`bg-white border rounded-xl overflow-hidden`}>
			<div className="bg-gray-500 opacity-25 h-[200px]">
			</div>
			<div className="flex flex-col gap-4 px-4 py-6">
				<Skeleton width={160} animation="wave" />
				<Skeleton width={120} animation="wave" />
			</div>
		</div>
	);
};

export default Skeleton_Clubs_rolodex_card;