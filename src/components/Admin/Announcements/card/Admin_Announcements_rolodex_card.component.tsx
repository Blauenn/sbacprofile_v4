import { useState } from "react";
import { hover_transition } from "../../../../constants/styles/transition.style";
import { AnnouncementInterface } from "../../../../interfaces/common.interface";
import Admin_Announcements_modal_update from "../modal/Admin_Announcements_modal_update.component";

interface CurrentComponentProp {
	announcement: AnnouncementInterface;
}

const Admin_Announcements_rolodex_card = (props: CurrentComponentProp) => {
	const { announcement } = props;

	const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
	const onUpdateModalClose = () => {
		setUpdateModalOpen(false);
	};

	return (
		<>
			<div className={`bg-white rounded-xl hover:bg-slate-200 cursor-pointer ${hover_transition}`}
				onClick={() => { setUpdateModalOpen(true); }}>
				<div className="flex flex-col px-4 py-2">
					<h1 className={`text-xl font-semibold line-clamp-1`}>{announcement.announcement_title}</h1>
					<h1 className="opacity-50 text-md line-clamp-2">{announcement.announcement_description}</h1>
				</div>
			</div>
			<Admin_Announcements_modal_update announcement={announcement} open={updateModalOpen} onModalClose={onUpdateModalClose} />
		</>
	);
};

export default Admin_Announcements_rolodex_card;