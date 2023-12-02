import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import fade_transition from "../../animations/fade_transition.transition";
// Contexts //
import { useContext_Announcements } from "../../contexts/Announcement.context";
// Components //
import Create_button from "../../components/Custom/Custom_Button";
import Page_header_return from "../../components/miscellaneous/common/Page_header_return.component";
import Admin_Announcements_modal_create from "../../components/Admin/Announcements/modal/Admin_Announcement_modal_create.component";
import Admin_Announcements_rolodex from "../../components/Admin/Announcements/Admin_Announcements_rolodex.component";
import Skeleton_Admin_Announcements_rolodex from "../../components/Admin/Announcements/Skeleton_Admin_Announcements_rolodex.component";

const Admin_Announcements = () => {
	const { announcements, fetchAnnouncements } = useContext_Announcements();

	useEffect(() => {
		fetchAnnouncements();
	}, [announcements]);

	const [createModalOpen, setCreateModalOpen] = useState(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_admin_announcements");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="mb-8">
				<Create_button setModalOpen={setCreateModalOpen}
					icon="fa-solid fa-bullhorn"
					text={t("create_button_title")} />
				<Admin_Announcements_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
			</div>

			{announcements.status ? (
				<Admin_Announcements_rolodex />
			) : (
				<Skeleton_Admin_Announcements_rolodex />
			)}
		</>
	);
};

export default fade_transition(Admin_Announcements);