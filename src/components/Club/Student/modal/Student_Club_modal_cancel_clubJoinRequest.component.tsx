import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { ClubJoinRequestInterface } from "../../../../interfaces/clubs.interface";
// Functions //
import { clubJoinRequest_delete } from "../../../../functions/CRUD/Clubs/ClubJoinRequests/clubJoinRequest_delete.function";
// Contexts //
import { useContext_Clubs } from "../../../../contexts/Clubs.context";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

interface CurrentComponentProp {
	clubJoinRequest: ClubJoinRequestInterface;
	open: boolean;
	onModalClose: () => void;
}

const Student_Club_modal_cancel_clubJoinRequest = (props: CurrentComponentProp) => {
	const { clubJoinRequest, open, onModalClose } = props;

	const { fetchClubJoinRequests } = useContext_Clubs();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCancelSuccess, setIsCancelSuccess] = useState(false);

	const handleModalClose = () => {
		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await clubJoinRequest_delete(
			clubJoinRequest.club_join_request_ID
		);

		if (submissionStatus) {
			fetchClubJoinRequests(true);

			setIsCancelSuccess(true);
			handleModalClose();
		} else {
			setIsCancelSuccess(false);
		}
		setIsSubmitting(false);
	};

	const { t } = useTranslation("crud_modal_clubJoinRequests");

	return (
		<Custom_Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-right-from-bracket rotate-180"
			title={t("cancelJoinRequest_modal_header")}>
			<div className="flex flex-col w-full gap-8">
				<h1 className="opacity-50">
					{t("cancelJoinRequest_modal_message")}
				</h1>
				{/* Submit button */}
				<Submit_button
					text={t("cancelJoinRequest_modal_submit_button_title")}
					successText={t(
						"cancelJoinRequest_modal_submit_success_message"
					)}
					icon="fa-solid fa-right-from-bracket rotate-180"
					color="border-red-500 hover:bg-red-500 text-red-500"
					isSubmitting={isSubmitting}
					isSuccess={isCancelSuccess}
					onClickFunction={setObjectAndSubmit}
				/>
			</div>
		</Custom_Modal>
	);
};

export default Student_Club_modal_cancel_clubJoinRequest;
