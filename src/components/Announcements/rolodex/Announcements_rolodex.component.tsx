import { useState, useEffect } from "react";
import { AnnouncementInterface } from "../../../interfaces/common.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Contexts //
import { useContext_Announcements } from "../../../contexts/Announcement.context";
// Components //
import Announcements_rolodex_card from "../card/Announcements_rolodex_card.component";
import Loading from "../../miscellaneous/Loading.component";
import NoResults from "../../miscellaneous/NoResults.component";

const Announcements_rolodex = () => {
	const { announcements, fetchAnnouncements } = useContext_Announcements();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (announcements.result.length === 0) {
			fetchAnnouncements();
		}

		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 10000);

		return () => clearTimeout(timer);
	}, []);

	const filteredAnnouncements = announcements.result
		.filter(
			(announcement: AnnouncementInterface) => announcement.announcement_status === 1
		);

	if (filteredAnnouncements?.length > 0) {
		return (
			<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
				{filteredAnnouncements.map((announcement: AnnouncementInterface) => (
					<Announcements_rolodex_card
						key={announcement.announcement_ID}
						announcement={announcement}
					/>
				))}
			</div>
		);
	} else {
		return <>{isLoading ? <Loading /> : <NoResults />}</>;
	}
};

export default fade_transition(Announcements_rolodex);
