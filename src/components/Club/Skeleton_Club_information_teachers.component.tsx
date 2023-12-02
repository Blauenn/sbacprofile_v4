import { Skeleton } from "@mui/material";

const Skeleton_Club_information_teachers = () => {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton width={80} animation="wave" />
			<div className="flex flex-col gap-2">
				{[...Array(2)].map((_, index) =>
					<div
						key={index}
						className="flex flex-row items-center gap-4">
						<Skeleton variant="circular" width={32} height={32} animation="wave" />
						<div className="flex flex-row gap-2">
							<Skeleton width={100} animation="wave" />
							<Skeleton width={60} animation="wave" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Skeleton_Club_information_teachers;