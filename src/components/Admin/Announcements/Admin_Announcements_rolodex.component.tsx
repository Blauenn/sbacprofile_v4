import fade_transition from "../../../animations/fade_transition.transition";
import { useContext_Announcements } from "../../../contexts/Announcement.context";
import { AnnouncementInterface } from "../../../interfaces/common.interface";
import Admin_Announcements_rolodex_card from "./card/Admin_Announcements_rolodex_card.component";

const Admin_Announcements_rolodex = () => {
	const { announcements } = useContext_Announcements();

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{[...announcements.result].map((announcement: AnnouncementInterface) => (
				<Admin_Announcements_rolodex_card key={announcement.announcement_ID} announcement={announcement} />
			))}
		</div>
	);
};

export default fade_transition(Admin_Announcements_rolodex);