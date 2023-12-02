import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { TeacherInterface } from "../../../../interfaces/user.interface";
// Functions //
import { teacher_delete } from "../../../../functions/CRUD/Teachers/teacher_delete.function";
// Contexts //
import { useContext_Teachers } from "../../../../contexts/Teacher.context";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";
// Constants //
import { imageField_profile_image_styles } from "../../../../constants/styles/image.style";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
  teacher: TeacherInterface;
  open: boolean;
  onModalClose: () => void;
}

const Admin_Teachers_modal_delete = (props: CurrentComponentProp) => {
  const { teacher, open, onModalClose } = props;

  const { fetchTeachers } = useContext_Teachers();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await teacher_delete(
      teacher.primary_teacher_ID
    );

    if (submissionStatus) {
      fetchTeachers(true);

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

	const { t } = useTranslation("crud_modal_teachers");

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("delete_modal_header")}>
      <div className="flex flex-col w-full gap-8">
        <h1 className="opacity-50">
          {t("delete_modal_message")}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <div className={`${imageField_profile_image_styles} bg-primary`}>
            <img src={`${CDN_ENDPOINT}${teacher.teacher_image}`} />
          </div>
          <h1 className="text-2xl font-semibold">
            {teacher.teacher_first_name} {teacher.teacher_last_name}
          </h1>
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

export default Admin_Teachers_modal_delete;
