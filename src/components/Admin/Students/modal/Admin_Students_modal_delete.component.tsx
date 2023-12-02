import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { useContext_Students } from "../../../../contexts/Student.context";
import { StudentInterface } from "../../../../interfaces/user.interface";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { student_delete } from "../../../../functions/CRUD/Students/student_delete.function";
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";
import { imageField_profile_image_styles } from "../../../../constants/styles/image.style";

interface CurrentComponentProp {
  student: StudentInterface;
  open: boolean;
  onModalClose: () => void;
}

const Admin_Students_modal_delete = (props: CurrentComponentProp) => {
  const { student, open, onModalClose } = props;

  const { fetchStudents } = useContext_Students();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await student_delete(
      student.primary_student_ID
    );

    if (submissionStatus) {
      fetchStudents(true);

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }
  };

	const { t } = useTranslation("crud_modal_students");

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("delete_modal_header")}>
      <div className="flex flex-col w-full gap-8">
        <h1 className="text-xl opacity-50">
          {t("delete_modal_message")}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <div className={`${imageField_profile_image_styles} bg-primary`}>
            <img src={`${CDN_ENDPOINT}${student.student_image}`} />
          </div>
          <h1 className="text-2xl font-semibold">
            {student.student_first_name} {student.student_last_name}
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

export default Admin_Students_modal_delete;
