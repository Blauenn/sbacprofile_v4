import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Button from "../../Custom/Custom_Button";
import { ClubInterface, ClubManagerInterface, ClubMembershipInterface } from "../../../interfaces/clubs.interface";
// Functions //
import { student_access_only } from "../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../contexts/Account.context";
import { useContext_Teachers } from "../../../contexts/Teacher.context";
// Components //
import Small_avatar from "../../miscellaneous/common/Small_avatar.component";
// Constants //
import Custom_Modal from "../../Custom/Custom_Modal";
import { border_color_from_major, hover_background_color_from_major, text_color_from_major } from "../../../constants/styles/colors/color_from_major.constant";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { teacher_image_from_ID, teacher_major_from_ID } from "../../../functions/information/teachers.function";
import { useContext_Students } from "../../../contexts/Student.context";
import { student_image_from_ID, student_major_from_ID } from "../../../functions/information/students.function";
import Clubs_rolodex_modal_join from "./Clubs_rolodex_modal_join.component";

interface CurrentComponentProp {
	club: ClubInterface;
	currentClubTeachers: ClubManagerInterface[];
	currentClubMembers: ClubMembershipInterface[];
	open: boolean;
	onModalClose: () => void;
}

const Clubs_rolodex_modal = (props: CurrentComponentProp) => {
	const { club, currentClubMembers, currentClubTeachers, open, onModalClose } =
		props;

	const { userInfo } = useContext_Account();
	const { students } = useContext_Students();
	const { teachers } = useContext_Teachers();

	const [joinModalOpen, setJoinModalOpen] = useState(false);
	const onJoinModalClose = () => {
		setJoinModalOpen(false);
	};

	const { t } = useTranslation("page_clubs");

	return (
		<Custom_Modal
			open={open}
			onModalClose={onModalClose}
			title={club.club_name}
			overflow>
			<div className="grid grid-cols-1 gap-8">
				{/* Club image */}
				<div className="flex justify-center w-full">
					{club.club_image !== "" &&
						club.club_image !== "/assets/profilePic/clubs/" ? (
						<img
							className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto"
							src={`${CDN_ENDPOINT}${club.club_image}`}
						/>
					) : null}
				</div>
				{/* Club title and description */}
				<div className="flex flex-col gap-2">
					<h1
						className={`text-2xl font-semibold ${text_color_from_major[club.club_major]
							}`}>
						{club.club_name}
					</h1>
					<h1 className="opacity-50">{club.club_description}</h1>
				</div>
				{/* Club teachers and students */}
				<div className="flex flex-col gap-4 px-4 py-6 border rounded-xl">
					{/* Teachers */}
					<div className="flex flex-col gap-2">
						<h1 className="font-semibold opacity-50 text-md">
							{t("teachers_title")}
						</h1>
						{currentClubTeachers.length !== 0 ? (
							<div className="flex -space-x-4">
								{currentClubTeachers.map((clubManager: ClubManagerInterface) => (
									<Small_avatar
										key={clubManager.club_manager_ID}
										imageURL={teacher_image_from_ID(
											clubManager.club_manager_teacher_ID,
											teachers.result
										)}
										profileMajor={teacher_major_from_ID(
											clubManager.club_manager_teacher_ID,
											teachers.result
										)}
									/>
								))}
							</div>
						) : (
							<h1 className="">{t("noTeachers_message")}</h1>
						)}
					</div>
					{/* Students */}
					<div className="flex flex-col gap-2">
						<h1 className="font-semibold opacity-50 text-md">
							{t("members_title")}
						</h1>
						{currentClubMembers.length !== 0 ? (
							<div className="flex -space-x-4">
								{currentClubMembers.map((clubMembership: ClubMembershipInterface) => (
									<Small_avatar
										key={clubMembership.club_membership_ID}
										imageURL={student_image_from_ID(
											clubMembership.club_membership_student_ID,
											students.result
										)}
										profileMajor={student_major_from_ID(
											clubMembership.club_membership_student_ID,
											students.result
										)}
									/>
								))}
							</div>
						) : (
							<h1 className="">{t("noMembers_message")}</h1>
						)}
					</div>
				</div>
				{/* Club join button */}
				{student_access_only(userInfo.profile_position) ? (
					<>
						<Clubs_rolodex_modal_join
							club={club}
							open={joinModalOpen}
							onModalClose={onJoinModalClose}
						/>
						<Custom_Button
							text={t("joinClub_button_title")}
							icon="fa-solid fa-right-from-bracket"
							color={`${border_color_from_major[club.club_major]} ${text_color_from_major[club.club_major]
								} ${hover_background_color_from_major[club.club_major]}`}
							setModalOpen={() => {
								setJoinModalOpen(true);
							}}
							fullWidth
						/>
					</>
				) : null}
			</div>
		</Custom_Modal>
	);
};

export default Clubs_rolodex_modal;
