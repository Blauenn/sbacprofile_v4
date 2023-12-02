import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { AnnouncementInterface } from "../../../../interfaces/common.interface";
// Functions //
import { announcement_delete } from "../../../../functions/CRUD/Announcements/announcement_delete.function";
// Contexts //
import { useContext_Announcements } from "../../../../contexts/Announcement.context";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

interface CurrentComponentProp {
  announcement: AnnouncementInterface;
  open: boolean;
  onModalClose: () => void;
}

const Admin_Announcements_modal_delete = (props: CurrentComponentProp) => {
  const { announcement, open, onModalClose } = props;

  const { fetchAnnouncements } = useContext_Announcements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await announcement_delete(
      announcement.announcement_ID
    );

    if (submissionStatus) {
      fetchAnnouncements(true);

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

	const { t } = useTranslation("crud_modal_announcements");

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("delete_modal_header")}>
      <div className="flex flex-col gap-4">
        <h1 className="opacity-50">
          {t("delete_modal_message")}
        </h1>
        <div className="flex flex-col mb-2">
          <h1 className="text-2xl font-semibold">{announcement.announcement_title}</h1>
          <h1 className="text-lg opacity-50">
            {announcement.announcement_description}
          </h1>
        </div>
        {/* Submit button */}
        <Submit_button
          text={t("delete_modal_submit_button_title")}
          successText={t(
            "delete_modal_submit_success_message"
          )}
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

export default Admin_Announcements_modal_delete;
