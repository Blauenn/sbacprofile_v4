import { useTranslation } from "react-i18next";
import { RequestFormInterface } from "../../../../interfaces/forms.interface";
// Functions //
import { change_to_locale_date, day_from_date } from "../../../../functions/dates.function";
// Components //
import Forms_approval_messages from "../../Forms_approval_timeline/Forms_approval_messages.component";
import Forms_approval_timeline from "../../Forms_approval_timeline/Forms_approval_timeline.component";
import Forms_student_information from "../../Forms_student_information.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";
import { day_colors } from "../../../../constants/styles/colors/color_from_day.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
	requestForm: RequestFormInterface;
}

const RequestForms_modal_content = (props: CurrentComponentProp) => {
	const { requestForm } = props;

	const { t } = useTranslation("forms_requestForms");

	return (
		<div className="flex flex-col w-full gap-8 p-2">
			{/* Student information */}
			<Forms_student_information
				form_ID={requestForm.request_form_ID}
				form_student_ID={requestForm.request_form_student_ID}
			/>
			{/* Request form title and description */}
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1 px-6 py-4 border rounded-xl">
					{/* Request form title */}
					<h1 className="text-2xl">{requestForm.request_form_title}</h1>
					{/* Request form description */}
					<h1 className="text-lg opacity-50">
						{requestForm.request_form_description}
					</h1>
				</div>
				{/* Request form attached file */}
				<div className="flex flex-col gap-1 px-6 py-4 border rounded-xl">
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold opacity-50 text-md">
							{t("modal_content_attachedFile_label")}
						</h1>
						{requestForm.request_form_attached_file != "" ? (
							<a
								download
								href={`${CDN_ENDPOINT}${requestForm.request_form_attached_file}`}
								target="_blank"
								className={`text-xl break-all hover:text-primary ${hover_transition}`}>
								<i className="fa-solid fa-folder me-4"></i>
								{t("modal_content_attachedFile_fileText")}
							</a>
						) : (
							<h1 className="text-xl">
								{t("modal_content_attachedFile_noFileText")}
							</h1>
						)}
					</div>
				</div>
				{/* Request form time of submission */}
				<div className="flex flex-col gap-8 p-6 border rounded-xl">
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold opacity-50 text-md">
							{t("RequestForm_modal_content_timeOfSubmission_label")}
						</h1>
						<h1
							className={`text-xl ${day_colors[
								day_from_date(requestForm.request_form_create_datetime)
								]
								}`}>
							{change_to_locale_date(requestForm.request_form_create_datetime)}
						</h1>
					</div>
				</div>
				{/* Request form approval status */}
				<div className="flex flex-col border sm:gap-8 rounded-xl sm:p-6">
					<Forms_approval_timeline
						teacher_status={requestForm.request_form_teacher_status}
						head_status={requestForm.request_form_head_status}
					/>
					<Forms_approval_messages
						teacher_description={requestForm.request_form_teacher_description}
						head_description={requestForm.request_form_head_description}
					/>
				</div>
			</div>
		</div>
	);
};

export default RequestForms_modal_content;
