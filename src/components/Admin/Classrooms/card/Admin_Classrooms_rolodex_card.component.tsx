import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClassroomInterface } from "../../../../interfaces/common.interface";
// Functions //
import { teacher_image_from_ID, teacher_major_from_ID, teacher_name_from_ID } from "../../../../functions/information/teachers.function";
// Contexts //
import { MajorContextProvider } from "../../../../contexts/Major.context";
import { useContext_Teachers } from "../../../../contexts/Teacher.context";
// Components //
import Admin_Classrooms_modal_update from "../modal/Admin_Classrooms_modal_update.component";
// Constants //
import { background_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { hover_transition } from "../../../../constants/styles/transition.style";
import { level_name } from "../../../../constants/names/level_name";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
	classroom: ClassroomInterface;
}

const Admin_Classrooms_rolodex_card = (props: CurrentComponentProp) => {
	const { classroom } = props;

	const { teachers, fetchTeachers } = useContext_Teachers();

	useEffect(() => {
		fetchTeachers();
	}, []);

	const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
	const onUpdateModalClose = () => {
		setUpdateModalOpen(false);
	};

	const { t } = useTranslation("page_admin_classrooms")

	return (
		<>
			<div className={`flex flex-row gap-4 px-4 py-2 bg-white rounded-xl hover:bg-slate-200 cursor-pointer ${hover_transition}`}
				onClick={() => { setUpdateModalOpen(true); }}>
				{classroom.classroom_homeroom_teacher !== 0 && teachers.status ? (
					<img src={`${CDN_ENDPOINT}${teacher_image_from_ID(classroom.classroom_homeroom_teacher, teachers.result)}`} className={`w-[50px] h-[50px] rounded-full ${background_color_from_major[teacher_major_from_ID(classroom.classroom_homeroom_teacher, teachers.result)]}`} />
				) : (
					<div className="rounded-full w-[50px] h-[50px] bg-gray-500 opacity-25"></div>
				)}
				<div className="flex flex-col">
					<h1 className="text-xl font-semibold">{level_name[classroom.classroom_level]}/{classroom.classroom_class}</h1>
					{classroom.classroom_homeroom_teacher !== 0 && teachers.status ? (
						<h1 className="opacity-50 text-md">{teacher_name_from_ID(classroom.classroom_homeroom_teacher, teachers.result)}</h1>
					) : (
						<h1 className="opacity-50 text-md line-clamp-1">{t("noHomeroomTeacher_message")}</h1>
					)}
				</div>
			</div>
			<MajorContextProvider>
				<Admin_Classrooms_modal_update classroom={classroom} open={updateModalOpen} onModalClose={onUpdateModalClose} />
			</MajorContextProvider>
		</>
	);
};

export default Admin_Classrooms_rolodex_card;