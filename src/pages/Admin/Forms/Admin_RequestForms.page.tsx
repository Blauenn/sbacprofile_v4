import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import fade_transition from "../../../animations/fade_transition.transition";
// Contexts //
import { useContext_RequestForms } from "../../../contexts/forms/RequestForm.context";
// Components //
import Page_header_return from "../../../components/miscellaneous/common/Page_header_return.component";
import Skeleton_Forms_rolodex from '../../../components/Forms/Skeleton_Forms_rolodex.component';
import RequestForms_rolodex from "../../../components/Forms/RequestForms/RequestForms_rolodex";

const Admin_RequestForms = () => {
	const { requestForms, fetchRequestForms } = useContext_RequestForms();

	useEffect(() => {
		fetchRequestForms();
	}, [requestForms]);

	const { t } = useTranslation("page_admin_requestForms");

	return (
		<>
			<Page_header_return text={t("header")} />

			{requestForms.status ? (
				<RequestForms_rolodex requestForms={requestForms.result} />
			) : (
				<Skeleton_Forms_rolodex />
			)}
		</>
	);
};

export default fade_transition(Admin_RequestForms);