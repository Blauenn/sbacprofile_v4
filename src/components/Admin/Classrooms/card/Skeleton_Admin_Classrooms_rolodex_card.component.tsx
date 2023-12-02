import { Skeleton } from "@mui/material";

const Skeleton_Admin_Classrooms_rolodex_card = () => {
	return (
		<div className={`flex flex-row gap-4 px-4 py-2 bg-white rounded-xl`}>
			<Skeleton variant="circular" width={50} height={50} animation="wave" />
			<div className="flex flex-col">
				<Skeleton width={140} animation="wave" />
				<Skeleton width={80} animation="wave" />
			</div>
		</div>
	);
};

export default Skeleton_Admin_Classrooms_rolodex_card;