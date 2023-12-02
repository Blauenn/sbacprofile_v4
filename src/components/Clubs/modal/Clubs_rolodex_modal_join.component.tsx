import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../Custom/Custom_Modal";
import { ClubInterface } from "../../../interfaces/clubs.interface";
// Contexts //
import { useContext_Account } from "../../../contexts/Account.context";
import { useContext_Clubs } from "../../../contexts/Clubs.context";
// Functions //
// Components //
import Submit_button from "../../miscellaneous/common/Buttons/Submit_button.component";
// Constants //
import { border_color_from_major, hover_background_color_from_major, text_color_from_major } from "../../../constants/styles/colors/color_from_major.constant";
import { clubJoinRequest_create } from "../../../functions/CRUD/Clubs/ClubJoinRequests/clubJoinRequest_create.function";

interface CurrentComponentProp {
	club: ClubInterface;
	open: boolean;
	onModalClose: () => void;
}

const Clubs_rolodex_modal_join = (props: CurrentComponentProp) => {
	const { club, open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchClubJoinRequests } = useContext_Clubs();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

	const handleModalClose = () => {
		setIsSubmitting(false);
		setIsSubmitSuccess(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await clubJoinRequest_create(
			club.club_ID,
			userInfo.profile_ID,
		);

		if (submissionStatus) {
			fetchClubJoinRequests(true);

			setIsSubmitting(false);
			setIsSubmitSuccess(true);

			setTimeout(() => {
				handleModalClose();
			}, 3000);
		} else {
			setIsSubmitting(false);
			setIsSubmitSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_clubs");

	return (
		<Custom_Modal
			open={open}
			onModalClose={handleModalClose}
			title={t("joinClub_modal_header")}>
			<div className="flex flex-col gap-4">
				<div>
					<h1 className="font-semibold opacity-50">
						{t("joinClub_modal_title")}
					</h1>
					<h1
						className={`text-3xl font-bold mb-2 ${text_color_from_major[club.club_major]
							}`}>
						{club.club_name}
					</h1>
				</div>
				<h1 className="text-sm opacity-50">
					{t("joinClub_modal_description")}
				</h1>
				<Submit_button
					text={t("joinClub_modal_submit_button_title")}
					successText={t("joinClub_modal_submit_success_message")}
					icon="fa-solid fa-right-from-bracket"
					color={`${border_color_from_major[club.club_major]} ${text_color_from_major[club.club_major]
						} ${hover_background_color_from_major[club.club_major]}`}
					isSubmitting={isSubmitting}
					isSuccess={isSubmitSuccess}
					onClickFunction={() => {
						setObjectAndSubmit();
					}}
				/>
			</div>
		</Custom_Modal>
	);
};

export default Clubs_rolodex_modal_join;
