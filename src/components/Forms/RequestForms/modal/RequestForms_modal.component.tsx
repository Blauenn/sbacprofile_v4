import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { RequestFormInterface } from "../../../../interfaces/forms.interface";
// Functions //
import { teacher_access_only, head_access_only, student_access_only } from "../../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
// Components //
import RequestForms_modal_content from "./RequestForms_modal_content.component";
import RequestForms_evaluate_button from "./evaluate/RequestForms_evaluate_button.component";
import RequestForms_modal_evaluate from "./evaluate/RequestForms_modal_evaluate.component";
import RequestForms_modal_delete from "./RequestForms_modal_delete.component";
import RequestForms_delete_button from "./RequestForms_delete_button.component";

interface CurrentComponentProp {
	requestForm: RequestFormInterface;
	open: boolean;
	onModalClose: () => void;
}

const RequestForms_modal = (props: CurrentComponentProp) => {
	const { requestForm, open, onModalClose } = props;

	const { userInfo } = useContext_Account();

	const handleModalClose = () => {
		onModalClose();
	};

	const [evaluateModalOpen, setEvaluateModalOpen] = useState(false);
	const onEvaluateModalClose = () => {
		setEvaluateModalOpen(false);
	};
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const onDeleteModalClose = () => {
		setDeleteModalOpen(false);
	};

	const { t } = useTranslation("forms_requestForms");

	return (
		<Custom_Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-flag"
			title={t("students_view_modal_header")}
			overflow>
			<div className="flex flex-col w-full gap-4">
				<RequestForms_modal_content requestForm={requestForm} />
				{teacher_access_only(userInfo.profile_position) ||
					head_access_only(userInfo.profile_position) ? (
					<>
						<RequestForms_modal_evaluate
							requestForm={requestForm}
							open={evaluateModalOpen}
							onModalClose={onEvaluateModalClose}
						/>
						<RequestForms_evaluate_button
							requestForm={requestForm}
							functionToRun={() => {
								setEvaluateModalOpen(true);
							}}
						/>
					</>
				) : null}
				{student_access_only(userInfo.profile_position) ? (
					<>
						<RequestForms_modal_delete requestForm={requestForm} open={deleteModalOpen} onModalClose={onDeleteModalClose} />
						<RequestForms_delete_button functionToRun={() => { setDeleteModalOpen(true); }} />
					</>
				) : null}
			</div>
		</Custom_Modal>
	);
};

export default RequestForms_modal;
