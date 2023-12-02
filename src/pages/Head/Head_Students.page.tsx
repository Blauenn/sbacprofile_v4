import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Button from "../../components/Custom/Custom_Button";
import fade_transition from "../../animations/fade_transition.transition";
import { StudentInterface } from "../../interfaces/user.interface";
// Contexts providers //
import { MajorContextProvider } from "../../contexts/Major.context";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_Students } from "../../contexts/Student.context";
// Components //
import Page_header_return from "../../components/miscellaneous/common/Page_header_return.component";
import Admin_Students_rolodex from "../../components/Admin/Students/Admin_Students_rolodex.component";
import Skeleton_Admin_Profiles_rolodex from "../../components/Admin/Profiles/Skeleton_Admin_Profiles_rolodex.component";
import Admin_Students_modal_create from "../../components/Admin/Students/modal/Admin_Students_modal_create.component";

const Head_Students = () => {
	const { userInfo } = useContext_Account();
	const { students, fetchStudents } = useContext_Students();
	const [majorStudents, setMajorStudents] = useState<StudentInterface[]>([]);

	useEffect(() => {
		fetchStudents();

		const studentsInMajor = students.result.filter((student: StudentInterface) => student.student_major === userInfo.profile_major);
		setMajorStudents(studentsInMajor);
	}, [students]);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_head_students");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<Custom_Button text={t("create_button_title")} icon="fa-solid fa-graduation-cap" setModalOpen={setCreateModalOpen} />

				<MajorContextProvider>
					<Admin_Students_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
				</MajorContextProvider>
				
				{students.status ? (
					<Admin_Students_rolodex students={majorStudents} />
				) : (
					<Skeleton_Admin_Profiles_rolodex />
				)}
			</div>

		</>
	);
};

export default fade_transition(Head_Students);