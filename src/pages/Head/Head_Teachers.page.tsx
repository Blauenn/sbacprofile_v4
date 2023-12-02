import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Custom_Button from "../../components/Custom/Custom_Button";
import { TeacherInterface } from '../../interfaces/user.interface';
import fade_transition from '../../animations/fade_transition.transition';
// Context providers //
import { MajorContextProvider } from "../../contexts/Major.context";
// Contexts //
import { useContext_Teachers } from '../../contexts/Teacher.context';
import { useContext_Account } from "../../contexts/Account.context";
// Components //
import Admin_Teachers_rolodex from '../../components/Admin/Teachers/Admin_Teachers_rolodex.component';
import Skeleton_Admin_Profiles_rolodex from "../../components/Admin/Profiles/Skeleton_Admin_Profiles_rolodex.component";
import Page_header_return from '../../components/miscellaneous/common/Page_header_return.component';
import Admin_Teachers_modal_create from "../../components/Admin/Teachers/modal/Admin_Teachers_modal_create.component";

const Head_Teachers = () => {
	const { userInfo } = useContext_Account();
	const { teachers, fetchTeachers } = useContext_Teachers();

	const [majorTeachers, setMajorTeachers] = useState<TeacherInterface[]>([]);

	useEffect(() => {
		fetchTeachers();

		const teachersInMajor = teachers.result.filter((teacher: TeacherInterface) => teacher.teacher_major === userInfo.profile_major);
		setMajorTeachers(teachersInMajor);
	}, [teachers]);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_head_teachers");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<Custom_Button text={t("create_button_title")} icon="fa-solid fa-chalkboard-user" setModalOpen={setCreateModalOpen} />

				<MajorContextProvider>
					<Admin_Teachers_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
				</MajorContextProvider>

				{teachers.status ? (
					<Admin_Teachers_rolodex filteredTeachers={majorTeachers} />
				) : (
					<Skeleton_Admin_Profiles_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Head_Teachers);