import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RequestFormInterface } from "../../../interfaces/forms.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Functions //
import { student_major_from_ID } from "../../../functions/information/students.function";
// Contexts //
import { useContext_RequestForms } from "../../../contexts/forms/RequestForm.context";
import { useContext_Students } from "../../../contexts/Student.context";
import { useContext_Account } from "../../../contexts/Account.context";
// Components //
import Page_headerReturn from "../../../components/miscellaneous/common/Page_header_return.component";
import Skeleton_Forms_rolodex from '../../../components/Forms/Skeleton_Forms_rolodex.component';
import RequestForms_rolodex from "../../../components/Forms/RequestForms/RequestForms_rolodex";

const Head_RequestForms = () => {
	const { userInfo } = useContext_Account();
	const { requestForms, fetchRequestForms } = useContext_RequestForms();
	const { students, fetchStudents } = useContext_Students();

	const [majorRequestForms, setMajorRequestForms] = useState<RequestFormInterface[]>([]);

	useEffect(() => {
		fetchRequestForms();
		fetchStudents();

		const requestFormsInMajor = requestForms.result.filter((requestForm: RequestFormInterface) => student_major_from_ID(requestForm.request_form_student_ID, students.result) === userInfo.profile_major && requestForm.request_form_teacher_status === 2);
		setMajorRequestForms(requestFormsInMajor);
	}, [requestForms, students]);

	const { t } = useTranslation("page_head_requestForms");

	return (
		<>
			<Page_headerReturn text={t("header")} />

			{requestForms.status ? (
				<RequestForms_rolodex requestForms={majorRequestForms} />
			) : (
				<Skeleton_Forms_rolodex />
			)}
		</>
	);
};

export default fade_transition(Head_RequestForms);