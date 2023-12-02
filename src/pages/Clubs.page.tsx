import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import fade_transition from "../animations/fade_transition.transition";
// Contexts //
import { useContext_Clubs } from "../contexts/Clubs.context";
import { useContext_Students } from "../contexts/Student.context";
import { useContext_Teachers } from "../contexts/Teacher.context";
// Components //
import Page_header from "../components/miscellaneous/common/Page_header.component";
import Clubs_rolodex from "../components/Clubs/Clubs_rolodex.component";
import Skeleton_Clubs_rolodex from "../components/Clubs/Skeleton_Clubs_rolodex.component";

const Clubs = () => {
	const { clubs, fetchClubs, clubManagers, fetchClubManagers, clubMemberships, fetchClubMemberships, } = useContext_Clubs();
	const { students, fetchStudents } = useContext_Students();
	const { teachers, fetchTeachers } = useContext_Teachers();

	useEffect(() => {
		fetchClubs();
		fetchClubManagers();
		fetchClubMemberships();

		fetchStudents();
		fetchTeachers();
	}, [clubs, clubManagers, clubMemberships, students, teachers]);

	const { t } = useTranslation("page_clubs");

	return (
		<>
			<Page_header
				icon="fa-solid fa-puzzle-piece"
				text={t("header")}
			/>

			{clubs.status && clubManagers.status && clubMemberships.status ? (
				<Clubs_rolodex clubs={clubs.result} />
			) : (
				<Skeleton_Clubs_rolodex />
			)}
		</>
	);
};

export default fade_transition(Clubs);