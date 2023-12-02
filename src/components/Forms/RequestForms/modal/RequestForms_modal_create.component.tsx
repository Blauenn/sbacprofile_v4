import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import Custom_FileFields from "../../../Custom/Fields/Custom_FileFields";
import { TextField_text, TextField_multiline } from "../../../Custom/Fields/Custom_TextFields";
// Functions //
import { requestForm_create } from "../../../../functions/CRUD/Forms/RequestForms/requestForm_create.function";
// Contexts //
import { useContext_RequestForms } from "../../../../contexts/forms/RequestForm.context";
import { useContext_Account } from "../../../../contexts/Account.context";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

interface CurrentComponentProp {
	open: boolean;
	onModalClose: () => void;
}

const RequestForms_modal_create = (props: CurrentComponentProp) => {
	const { open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchRequestForms } = useContext_RequestForms();

	const [requestFormCreateObject, setRequestFormCreateObject] = useState({
		request_form_ID: "",
		request_form_student_ID: 0,
		request_form_title: "",
		request_form_description: "",
		request_form_create_datetime: "",
		request_form_attached_file: "",
		request_form_teacher_ID: 0,
		request_form_teacher_status: 1,
		request_form_teacher_description: "",
		request_form_teacher_change_datetime: "",
		request_form_head_ID: 0,
		request_form_head_status: 1,
		request_form_head_description: "",
		request_form_head_change_datetime: "",
	});
	const [requestFormFile, setRequestFormFile] = useState(null);
	const [requestFormFileName, setRequestFormFileName] = useState("");

	const [validationErrors, setValidationErrors] = useState({
		request_form_title: "",
		request_form_description: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreateSuccess, setIsCreateSuccess] = useState(false);

	const handleModalClose = () => {
		setRequestFormCreateObject({
			request_form_ID: "",
			request_form_student_ID: 0,
			request_form_title: "",
			request_form_description: "",
			request_form_create_datetime: "",
			request_form_attached_file: "",
			request_form_teacher_ID: 0,
			request_form_teacher_status: 1,
			request_form_teacher_description: "",
			request_form_teacher_change_datetime: "",
			request_form_head_ID: 0,
			request_form_head_status: 1,
			request_form_head_description: "",
			request_form_head_change_datetime: "",
		});
		setValidationErrors({
			request_form_title: "",
			request_form_description: "",
		});
		setRequestFormFile(null);
		setRequestFormFileName("");

		setIsCreateSuccess(false);
		setIsSubmitting(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await requestForm_create(
			requestFormCreateObject,
			userInfo.profile_ID,
			requestFormFile,
			requestFormFileName,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchRequestForms(true);

			setIsSubmitting(false);
			setIsCreateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsCreateSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_requestForms");

	return (
		<Custom_Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-plus"
			title={t("create_modal_header")}>
			<div className="grid grid-cols-1 gap-4">
				{/* Title */}
				<TextField_text
					label={t("create_modal_title_label")}
					name="request_form_title"
					className="col-span-1"
					object={requestFormCreateObject}
					setObject={setRequestFormCreateObject}
					validation={validationErrors.request_form_title}
				/>
				{/* Description */}
				<TextField_multiline
					label={t("create_modal_description_label")}
					name="request_form_description"
					className="col-span-1"
					object={requestFormCreateObject}
					setObject={setRequestFormCreateObject}
					validation={validationErrors.request_form_description}
					maxRows={4}
				/>
				{/* File */}
				<Custom_FileFields
					file={requestFormFile}
					setFile={setRequestFormFile}
					setFileName={setRequestFormFileName}
					fileLabel={t("create_modal_file_label")}
					fileSizeNoticeMessage={t(
						"create_modal_file_fileSizeNotice_message"
					)}
				/>
				{/* Submit button */}
				<Submit_button
					text={t("create_modal_submit_button_title")}
					successText={t(
						"create_modal_submit_success_message"
					)}
					icon="fa-solid fa-folder"
					isSubmitting={isSubmitting}
					isSuccess={isCreateSuccess}
					onClickFunction={setObjectAndSubmit}
				/>
			</div>
		</Custom_Modal>
	);
};

export default RequestForms_modal_create;