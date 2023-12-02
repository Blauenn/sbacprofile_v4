import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Button from "../../components/Custom/Custom_Button";
import { StudentInterface } from "../../interfaces/user.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Functions //
import { has_number } from "../../functions/string.function";
// Context providers //
import { MajorContextProvider } from "../../contexts/Major.context";
import { ClassroomContextProvider } from "../../contexts/Classroom.context";
// Contexts //
import { useContext_Students } from "../../contexts/Student.context";
// Components //
import Page_header_return from "../../components/miscellaneous/common/Page_header_return.component";
import Admin_Students_rolodex from "../../components/Admin/Students/Admin_Students_rolodex.component";
import Skeleton_Admin_Profiles_rolodex from "../../components/Admin/Profiles/Skeleton_Admin_Profiles_rolodex.component";
import Students_filters from "../../components/Profiles/Student/filters/Students_filters.component";
import Admin_Students_modal_create from "../../components/Admin/Students/modal/Admin_Students_modal_create.component";

const Admin_Students = () => {
	const { students, fetchStudents } = useContext_Students();

	const [selectedMajor, setSelectedMajor] = useState(0);
	const [selectedLevel, setSelectedLevel] = useState(0);
	const [selectedClass, setSelectedClass] = useState(0);
	const [searchField, setSearchField] = useState("");

	const onMajorChange = (event: any) => {
		setSelectedMajor(parseInt(event.target.value));
	};
	const onLevelChange = (event: any) => {
		setSelectedClass(0);
		setSelectedLevel(parseInt(event.target.value));
	};
	const onClassChange = (event: any) => {
		setSelectedClass(parseInt(event.target.value));
	};
	const onSearchFieldChange = (event: any) => {
		setSearchField(event.target.value.toLowerCase());
	};

	const filteredStudentMajor: StudentInterface[] =
		selectedMajor !== 0
			? students.result.filter(
				(student: StudentInterface) => student.student_major === selectedMajor
			)
			: students.result;

	const filteredStudentLevel: StudentInterface[] =
		selectedLevel !== 0
			? filteredStudentMajor.filter((student: StudentInterface) => {
				return student.student_level === selectedLevel;
			})
			: filteredStudentMajor;

	const filteredStudentClass: StudentInterface[] =
		selectedClass !== 0
			? filteredStudentLevel.filter(
				(student: StudentInterface) => student.student_class === selectedClass
			)
			: filteredStudentLevel;

	const filteredStudents: StudentInterface[] = filteredStudentClass.filter(
		(student: StudentInterface) => {
			if (has_number(searchField)) {
				return student.student_ID.toString().includes(searchField);
			} else {
				return (student.student_first_name + student.student_last_name)
					.toLowerCase()
					.includes(searchField);
			}
		}
	);

	useEffect(() => {
		fetchStudents();
	}, [students]);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_admin_students");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<Custom_Button text={t("create_button_title")} icon="fa-solid fa-graduation-cap" setModalOpen={setCreateModalOpen} />

				<MajorContextProvider>
					<Admin_Students_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
					<ClassroomContextProvider>
						<Students_filters
							selectedMajor={selectedMajor}
							selectedLevel={selectedLevel}
							onMajorChangeHandler={onMajorChange}
							onLevelChangeHandler={onLevelChange}
							onClassChangeHandler={onClassChange}
							onSearchFieldChangeHandler={onSearchFieldChange}
						/>
					</ClassroomContextProvider>
				</MajorContextProvider>

				{students.status ? (
					<Admin_Students_rolodex students={filteredStudents} />
				) : (
					<Skeleton_Admin_Profiles_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Admin_Students);