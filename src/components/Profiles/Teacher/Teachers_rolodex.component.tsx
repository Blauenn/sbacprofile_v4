import { useState, useEffect } from "react";
import i18n from "../../../i18n";
import { TeacherInterface } from "../../../interfaces/user.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Contexts //
import { useContext_Classrooms } from "../../../contexts/Classroom.context";
// Components //
import Loading from "../../miscellaneous/Loading.component";
import NoResults from "../../miscellaneous/NoResults.component";
import Rolodex_card from "../rolodex/card/Rolodex_card.component";
// Constants //
import {
	major_name_thai,
	major_name_german,
	major_name,
} from "../../../constants/names/major_name";

interface CurrentComponentProp {
	filteredTeachers: TeacherInterface[];
}

const Teachers_rolodex = (props: CurrentComponentProp) => {
	const { filteredTeachers } = props;

	const { fetchClassrooms } = useContext_Classrooms();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchClassrooms();

		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const sortedTeachers = filteredTeachers.sort(
		(a: TeacherInterface, b: TeacherInterface) => {
			if (a.teacher_major !== b.teacher_major) {
				return a.teacher_major - b.teacher_major;
			} else {
				return a.teacher_ID - b.teacher_ID;
			}
		}
	);

	if (sortedTeachers?.length > 0) {
		const sortedTeachersByMajor: { [major: string]: TeacherInterface[]; } = {};

		// Group by major //
		sortedTeachers.forEach((teacher: TeacherInterface) => {
			const { teacher_major } = teacher;
			if (!sortedTeachersByMajor[teacher_major]) {
				sortedTeachersByMajor[teacher_major] = [];
			}
			sortedTeachersByMajor[teacher_major].push(teacher);
		});

		return (
			<div className="flex flex-col gap-14">
				{Object.entries(sortedTeachersByMajor).map(([major, teachers]) => (
					<div key={major} className="flex flex-col gap-6">
						<h1 className="text-xl lg:text-2xl | font-semibold xl:mx-16">
							{i18n.language === "th"
								? major_name_thai[parseInt(major)]
								: i18n.language === "de"
									? major_name_german[parseInt(major)]
									: major_name[parseInt(major)]}
						</h1>
						<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 xl:mx-16 | grid gap-4">
							{teachers.map((teacher: TeacherInterface) => (
								<Rolodex_card
									key={teacher.primary_teacher_ID}
									profile="teacher"
									object={teacher}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		);
	} else {
		return <>{isLoading ? <Loading /> : <NoResults />}</>;
	}
};

export default fade_transition(Teachers_rolodex);
