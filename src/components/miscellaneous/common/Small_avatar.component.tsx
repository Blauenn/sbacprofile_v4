import { Tooltip } from "@mui/material";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { default_image } from "../../../constants/styles/miscellaneous/default_image.constant";
import { background_color_from_major } from "../../../constants/styles/colors/color_from_major.constant";

interface CurrentComponentProp {
	title?: string;
	imageURL?: string;
	profileMajor: number;
}

const Small_avatar = (props: CurrentComponentProp) => {
	const { title, imageURL, profileMajor } = props;

	return (
		<Tooltip title={title} placement="bottom" arrow>
			<div
				className={`${background_color_from_major[profileMajor]} w-[40px] h-[40px] rounded-full overflow-hidden`}>
				<img
					src={`${CDN_ENDPOINT}${imageURL}`}
					loading="lazy"
					className="flex-shrink-0 shadow-sm"
					onError={(e) => {
						e.currentTarget.src = default_image;
					}}
				/>
			</div>
		</Tooltip>
	);
};

export default Small_avatar;
