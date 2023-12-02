import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Custom_Button from "../../components/Custom/Custom_Button";
import { TeacherInterface } from '../../interfaces/user.interface';
import fade_transition from '../../animations/fade_transition.transition';
// Functions //
import { has_number } from '../../functions/string.function';
// Context providers //
import { MajorContextProvider } from '../../contexts/Major.context';
// Contexts //
import { useContext_Teachers } from '../../contexts/Teacher.context';
// Components //
import Admin_Teachers_rolodex from '../../components/Admin/Teachers/Admin_Teachers_rolodex.component';
import Skeleton_Admin_Profiles_rolodex from "../../components/Admin/Profiles/Skeleton_Admin_Profiles_rolodex.component";
import Teachers_filters from '../../components/Profiles/Teacher/filters/Teachers_filters.component';
import Page_header_return from '../../components/miscellaneous/common/Page_header_return.component';
import Admin_Teachers_modal_create from "../../components/Admin/Teachers/modal/Admin_Teachers_modal_create.component";

const Admin_Teachers = () => {
	const { teachers, fetchTeachers } = useContext_Teachers();

	const [selectedMajor, setSelectedMajor] = useState(0);
	const [searchField, setSearchField] = useState("");

	const onMajorChange = (event: any) => {
		setSelectedMajor(parseInt(event.target.value));
	};
	const onSearchFieldChange = (event: any) => {
		setSearchField(event.target.value.toLowerCase());
	};

	const filteredTeacherMajor: TeacherInterface[] =
		selectedMajor !== 0
			? teachers.result.filter(
				(teacher: TeacherInterface) => teacher.teacher_major === selectedMajor
			)
			: teachers.result;

	const filteredTeachers: TeacherInterface[] = filteredTeacherMajor.filter(
		(teacher: TeacherInterface) => {
			if (has_number(searchField)) {
				return teacher.teacher_ID.toString().includes(searchField);
			} else {
				return (teacher.teacher_first_name + teacher.teacher_last_name)
					.toLowerCase()
					.includes(searchField);
			}
		}
	);

	useEffect(() => {
		fetchTeachers();
	}, [teachers]);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_admin_teachers");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<Custom_Button text={t("create_button_title")} icon="fa-solid fa-chalkboard-user" setModalOpen={setCreateModalOpen} />
				
				<MajorContextProvider>
					<Admin_Teachers_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />

					<Teachers_filters
						onMajorChangeHandler={onMajorChange}
						onSearchFieldChangeHandler={onSearchFieldChange}
					/>
				</MajorContextProvider>

				{teachers.status ? (
					<Admin_Teachers_rolodex filteredTeachers={filteredTeachers} />
				) : (
					<Skeleton_Admin_Profiles_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Admin_Teachers);