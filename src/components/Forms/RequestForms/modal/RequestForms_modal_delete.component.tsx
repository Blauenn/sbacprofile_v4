import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { RequestFormInterface } from "../../../../interfaces/forms.interface";
// Contexts //
import { useContext_RequestForms } from "../../../../contexts/forms/RequestForm.context";
// Components //
import { requestForm_delete } from "../../../../functions/CRUD/Forms/RequestForms/requestForm_delete.function";
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

interface CurrentComponentProp {
  requestForm: RequestFormInterface;
  open: boolean;
  onModalClose: () => void;
}

const RequestForms_modal_delete = (props: CurrentComponentProp) => {
  const { requestForm, open, onModalClose } = props;

  const { fetchRequestForms } = useContext_RequestForms();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleModalClose = () => {
    setIsSubmitting(false);
    setIsDeleteSuccess(false);

    onModalClose();
  };

  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    const submissionStatus = await requestForm_delete(
      requestForm.request_form_ID
    );

    if (submissionStatus) {
      fetchRequestForms(true);

      setIsSubmitting(false);
      setIsDeleteSuccess(true);

      handleModalClose();
    } else {
      setIsSubmitting(false);
      setIsDeleteSuccess(false);
    }

    setIsDeleteSuccess(true);
  };

	const { t } = useTranslation("crud_modal_requestForms");

  return (
    <Custom_Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-trash-can"
      title={t("delete_modal_header")}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4">
          <h1 className="opacity-50">
            {t("delete_modal_message")}
          </h1>
          <div className="flex flex-col gap-1 p-4 mb-2 border rounded-xl">
            <h1 className="text-2xl">{requestForm.request_form_title}</h1>
            <h1 className="text-lg opacity-50">
              {requestForm.request_form_description}
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
      </div>
    </Custom_Modal>
  );
};

export default RequestForms_modal_delete;
