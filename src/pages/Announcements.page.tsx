import { useTranslation } from "react-i18next";
import fade_transition from "../animations/fade_transition.transition";
import Page_header from "../components/miscellaneous/common/Page_header.component";

const Announcements = () => {
	const { t } = useTranslation("page_announcements");

	return (
		<>
			<Page_header
				icon="fa-solid fa-bullhorn"
				text={t("header")}
			/>

			{/* <Announcements_rolodex /> */}
		</>
	);
};

export default fade_transition(Announcements);