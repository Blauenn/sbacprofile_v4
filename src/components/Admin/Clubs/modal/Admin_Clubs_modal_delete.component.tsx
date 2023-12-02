import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { ClubInterface } from "../../../../interfaces/clubs.interface";
// Functions //
import { club_delete } from "../../../../functions/CRUD/Clubs/Clubs/club_delete.function";
// Contexts //
import { useContext_Clubs } from "../../../../contexts/Clubs.context";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

interface CurrentComponentProp {
  club: ClubInterface;
  open: boolean;
  onModalClose: () => void;
}

const Admin_Clubs_modal_delete = (props: CurrentComponentProp) => {
  const { club, open, onModalClose } = props;

  const { fetchClubs } = useContext_Clubs();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await club_delete(club.club_ID);

    if (submissionStatus) {
      fetchClubs(true);

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

	const { t } = useTranslation("crud_modal_clubs");

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("delete_modal_header")}>
      <div className="flex flex-col gap-4">
        <h1 className="opacity-50">{t("delete_modal_message")}</h1>
        <div className="flex flex-col mb-2">
          <h1 className="text-2xl font-semibold">{club.club_name}</h1>
        </div>
        {/* Submit button */}
        <Submit_button
          text={t("delete_modal_submit_button_title")}
          successText={t("delete_modal_submit_success_message")}
          icon="fa-solid fa-trash-can"
          color="border-red-500 hover:bg-red-500 text-red-500"
          isSubmitting={isSubmitting}
          isSuccess={isDeleteSuccess}
          onClickFunction={setObjectAndSubmit}
        />
      </div>
    </Custom_Modal>
  );
};

export default Admin_Clubs_modal_delete;
