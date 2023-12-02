import { Skeleton } from "@mui/material";

const Skeleton_Admin_Announcements_rolodex_card = () => {
	return (
		<div className="bg-white rounded-xl">
			<div className="flex flex-col px-4 py-2">
				<Skeleton width={160} animation="wave" />
				<Skeleton width={120} animation="wave" />
			</div>
		</div>
	);
};

export default Skeleton_Admin_Announcements_rolodex_card;