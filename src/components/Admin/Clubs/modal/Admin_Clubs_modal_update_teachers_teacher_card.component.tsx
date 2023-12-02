// Contexts //
import { useContext_Teachers } from '../../../../contexts/Teacher.context';
// Functions //
import { teacher_image_from_ID, teacher_major_from_ID, teacher_name_from_ID } from '../../../../functions/information/teachers.function';
// Constants //
import { background_color_from_major } from '../../../../constants/styles/colors/color_from_major.constant';
import { CDN_ENDPOINT } from '../../../../constants/ENDPOINTS';

interface CurrentComponentProp {
	teacher_ID: number;
}

const Admin_Clubs_modal_update_teachers_teacher_card = (props: CurrentComponentProp) => {
	const { teacher_ID } = props;

	const { teachers } = useContext_Teachers();

	return (
		<div className="flex flex-row items-center gap-4">
			<img
				src={`${CDN_ENDPOINT}${teacher_image_from_ID(
					teacher_ID,
					teachers.result
				)}`}
				className={`w-[40px] h-[40px] rounded-full ${background_color_from_major[
					teacher_major_from_ID(
						teacher_ID,
						teachers.result
					)
				]
					}`}
			/>
			<h1 className="font-semibold">
				{teacher_name_from_ID(teacher_ID, teachers.result)}
			</h1>
		</div>
	);
};

export default Admin_Clubs_modal_update_teachers_teacher_card;