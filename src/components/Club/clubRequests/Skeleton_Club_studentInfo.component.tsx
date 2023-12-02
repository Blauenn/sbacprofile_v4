import { Skeleton } from "@mui/material";

const Skeleton_Club_studentInfo = () => {
	return (
		<div
			className="flex flex-row items-center gap-4">
			<Skeleton variant="circular" width={32} height={32} animation="wave" />
			<div className="flex flex-row gap-2">
				<Skeleton width={120} animation="wave" />
				<Skeleton width={100} animation="wave" />
			</div>
		</div>
	);
};

export default Skeleton_Club_studentInfo;