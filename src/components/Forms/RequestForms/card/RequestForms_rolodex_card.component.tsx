import { useState } from "react";
import { RequestFormInterface } from "../../../../interfaces/forms.interface";
// Functions //
import { student_image_from_ID, student_major_from_ID } from "../../../../functions/information/students.function";
import { student_access_only } from "../../../../functions/permission_check.function";
// Contexts //
import { useContext_Students } from "../../../../contexts/Student.context";
import { useContext_Account } from "../../../../contexts/Account.context";
// Components //
import RequestForms_modal from "../modal/RequestForms_modal.component";
import Forms_rolodex_card_approvalIcon from "../../card/Forms_rolodex_card_approvalIcon.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";
import { background_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
	requestForm: RequestFormInterface;
}

const RequestForms_rolodex_card = (props: CurrentComponentProp) => {
	const { requestForm } = props;

	const { userInfo } = useContext_Account();
	const { students } = useContext_Students();

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const onModalClose = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div className={`flex flex-row gap-4 px-4 py-2 bg-white rounded-xl hover:bg-slate-200 cursor-pointer ${hover_transition}`} onClick={() => { setModalOpen(true); }}>
				{student_access_only(userInfo.profile_position) ? (
					<div className="hidden sm:block">
						<Forms_rolodex_card_approvalIcon teacher_status={requestForm.request_form_teacher_status} head_status={requestForm.request_form_head_status} />
					</div>
				) : (
					<div className="hidden sm:block">
						<img src={`${CDN_ENDPOINT}${student_image_from_ID(requestForm.request_form_student_ID, students.result)}`} className={`${background_color_from_major[student_major_from_ID(requestForm.request_form_student_ID, students.result)] ?? "bg-primary"} rounded-full w-[50px] h-[50px]`} />
					</div>
				)}
				<div className="flex flex-col">
					<h1 className="text-lg line-clamp-2">{requestForm.request_form_title}</h1>
					<h1 className="opacity-50 text-md">{requestForm.request_form_description}</h1>
				</div>
			</div>
			<RequestForms_modal requestForm={requestForm} open={modalOpen} onModalClose={onModalClose} />
		</>
	);
};

export default RequestForms_rolodex_card;