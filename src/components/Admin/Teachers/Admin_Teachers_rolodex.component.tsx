import { TeacherInterface } from "../../../interfaces/user.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Components //
import Admin_Teachers_rolodex_card from "./card/Admin_Teachers_rolodex_card.component";

interface CurrentComponentProp {
	filteredTeachers: TeacherInterface[]
}

const Admin_Teachers_rolodex = (props: CurrentComponentProp) => {
	const { filteredTeachers } = props;

	const sortedTeachers = filteredTeachers.sort(
		(a: TeacherInterface, b: TeacherInterface) => {
			if (a.teacher_major !== b.teacher_major) {
				return a.teacher_major - b.teacher_major;
			} else {
				return a.teacher_ID - b.teacher_ID;
			}
		}
	);

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{sortedTeachers.map((teacher: TeacherInterface) => (
				<Admin_Teachers_rolodex_card key={teacher.primary_teacher_ID} teacher={teacher} />
			))}
		</div>
	)
}

export default fade_transition(Admin_Teachers_rolodex);