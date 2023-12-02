import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { RequestFormInterface } from "../../interfaces/forms.interface";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_RequestForms } from "../../contexts/forms/RequestForm.context";
// Components //
import Page_header_return from "../../components/miscellaneous/common/Page_header_return.component";
import Custom_Button from "../../components/Custom/Custom_Button";
import RequestForms_modal_create from "../../components/Forms/RequestForms/modal/RequestForms_modal_create.component";
import RequestForms_rolodex from "../../components/Forms/RequestForms/RequestForms_rolodex";
import Skeleton_Forms_rolodex from "../../components/Forms/Skeleton_Forms_rolodex.component";

const Student_RequestForms = () => {
	const { userInfo } = useContext_Account();
	const { requestForms, fetchRequestForms } = useContext_RequestForms();

	const [selfRequestForms, setSelfRequestForms] = useState<RequestFormInterface[]>([]);

	useEffect(() => {
		fetchRequestForms();

		const requestFormsSelf = [...requestForms.result].filter((requestForm: RequestFormInterface) => requestForm.request_form_student_ID === userInfo.profile_ID);
		setSelfRequestForms(requestFormsSelf);
	}, [requestForms]);

	const [createModalOpen, setCreateModalOpen] = useState(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_student_requestForms");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="mb-8">
				<Custom_Button
					setModalOpen={setCreateModalOpen}
					icon="fa-solid fa-flag"
					text={t("create_button_title")}
				/>
				<RequestForms_modal_create
					open={createModalOpen}
					onModalClose={onCreateModalClose}
				/>
			</div>

			<div className="flex flex-col gap-4">
				{requestForms.status ? (
					<RequestForms_rolodex requestForms={selfRequestForms} />
				) : (
					<Skeleton_Forms_rolodex />
				)}
			</div>
		</>
	);
};

export default Student_RequestForms;