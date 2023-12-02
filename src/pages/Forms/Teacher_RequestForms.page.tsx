import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { RequestFormInterface } from "../../interfaces/forms.interface";
import { ClassroomInterface } from "../../interfaces/common.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Functions //
import { student_class_from_ID, student_level_from_ID } from "../../functions/information/students.function";
// Contexts //
import { useContext_RequestForms } from "../../contexts/forms/RequestForm.context";
import { useContext_Classrooms } from "../../contexts/Classroom.context";
import { useContext_Students } from "../../contexts/Student.context";
import { useContext_Account } from "../../contexts/Account.context";
// Components //
import RequestForms_rolodex from "../../components/Forms/RequestForms/RequestForms_rolodex";
import Skeleton_Forms_rolodex from "../../components/Forms/Skeleton_Forms_rolodex.component";
import Page_headerReturn from '../../components/miscellaneous/common/Page_header_return.component';

const Teacher_RequestForms = () => {
	const { userInfo } = useContext_Account();
	const { requestForms, fetchRequestForms } = useContext_RequestForms();
	const { students, fetchStudents } = useContext_Students();
	const { classrooms, fetchClassrooms } = useContext_Classrooms();

	const [studentRequestForms, setStudentRequestForms] = useState<RequestFormInterface[]>([]);

	useEffect(() => {
		fetchRequestForms();
		fetchStudents();
		fetchClassrooms();

		const filteredClassrooms = classrooms.result.filter((classroom: ClassroomInterface) => (
			classroom.classroom_homeroom_teacher === userInfo.profile_ID
		));
		const requestFormsFromHomeroomStudents = [...requestForms.result].filter((requestForm: RequestFormInterface) => (
			filteredClassrooms.some((classroom: ClassroomInterface) => (
				classroom.classroom_level === student_level_from_ID(requestForm.request_form_student_ID, students.result) &&
				classroom.classroom_class === student_class_from_ID(requestForm.request_form_student_ID, students.result)
			))
		));

		setStudentRequestForms(requestFormsFromHomeroomStudents);
	}, [requestForms, classrooms, students]);

	const { t } = useTranslation("page_teacher_requestForms");

	return (
		<>
			<Page_headerReturn text={t("header")} />

			<div className="flex flex-col gap-4">
				{requestForms.status ? (
					<RequestForms_rolodex requestForms={studentRequestForms} />
				) : (
					<Skeleton_Forms_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Teacher_RequestForms);