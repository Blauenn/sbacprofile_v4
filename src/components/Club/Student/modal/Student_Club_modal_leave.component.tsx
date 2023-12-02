import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface } from "../../../../interfaces/clubs.interface";
import Custom_Modal from "../../../Custom/Custom_Modal";
// Functions //
import { clubLeaveRequest_create } from "../../../../functions/CRUD/Clubs/ClubLeaveRequests/clubLeaveRequest_create.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
import { useContext_Clubs } from "../../../../contexts/Clubs.context";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

interface CurrentComponentProp {
  club: ClubInterface;
  open: boolean;
  onModalClose: () => void;
}

const Student_club_modal_leave = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { fetchClubLeaveRequests } = useContext_Clubs();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await clubLeaveRequest_create(
      club.club_ID,
      userInfo.profile_ID
    );

    if (submissionStatus) {
      fetchClubLeaveRequests(true);

      setIsSubmitSuccess(true);
      handleModalClose();
    } else {
      setIsSubmitSuccess(true);
    }
    setIsSubmitting(false);
  };

	const { t } = useTranslation("page_student_club");

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-right-from-bracket rotate-180"
      title={t("leaveRequest_modal_header")}>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">
            {t("leaveRequest_modal_message")}
          </h1>
          <h1 className="opacity-50">
            {t("leaveRequest_modal_description")}
          </h1>
        </div>
        {/* Submit button */}
        <Submit_button
          text={t("leaveRequest_modal_submit_button_title")}
          successText={t(
            "leaveRequest_modal_submit_success_message"
          )}
          icon="fa-solid fa-right-from-bracket rotate-180"
          color="border-red-500 hover:bg-red-500 text-red-500"
          isSubmitting={isSubmitting}
          isSuccess={isSubmitSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default Student_club_modal_leave;
