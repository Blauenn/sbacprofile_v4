import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Button from "../../components/Custom/Custom_Button";
import { ClubInterface } from "../../interfaces/clubs.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Contexts providers //
import { MajorContextProvider } from "../../contexts/Major.context";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_Clubs } from "../../contexts/Clubs.context";
import { useContext_Teachers } from "../../contexts/Teacher.context";
// Components //
import Page_header_return from "../../components/miscellaneous/common/Page_header_return.component";
import Admin_Clubs_rolodex from "../../components/Admin/Clubs/Admin_Clubs_rolodex.component";
import Skeleton_Admin_Clubs_rolodex from "../../components/Admin/Clubs/Skeleton_Admin_Clubs_rolodex.component";
import Admin_Clubs_modal_create from "../../components/Admin/Clubs/modal/Admin_Clubs_modal_create.component";

const Head_Clubs = () => {
	const { userInfo } = useContext_Account();
	const { clubs, fetchClubs, fetchClubMemberships, fetchClubManagers } = useContext_Clubs();
	const { fetchTeachers } = useContext_Teachers();

	const [majorClubs, setMajorClubs] = useState<ClubInterface[]>([]);

	useEffect(() => {
		fetchClubs();
		fetchClubMemberships();
		fetchClubManagers();

		fetchTeachers();

		const clubsInMajor = clubs.result.filter((club: ClubInterface) => club.club_major === userInfo.profile_major);
		setMajorClubs(clubsInMajor);
	}, [clubs]);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_head_clubs");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<Custom_Button text={t("create_button_title")} icon="fa-solid fa-puzzle-piece" setModalOpen={setCreateModalOpen} />

				<MajorContextProvider>
					<Admin_Clubs_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
				</MajorContextProvider>

				{clubs.status ? (
					<Admin_Clubs_rolodex clubs={majorClubs} />
				) : (
					<Skeleton_Admin_Clubs_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Head_Clubs);