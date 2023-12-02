import { Skeleton } from "@mui/material";

const Skeleton_Club_clubName = () => {
	return (
		<div className="flex flex-col">
			<Skeleton width={80} animation="wave" />
			<Skeleton width={280} height={60} animation="wave" />
			<Skeleton width={120} animation="wave" />
		</div>
	);
};

export default Skeleton_Club_clubName;