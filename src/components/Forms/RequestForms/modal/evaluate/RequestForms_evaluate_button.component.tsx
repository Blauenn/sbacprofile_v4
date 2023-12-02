import { useTranslation } from "react-i18next";
import { RequestFormInterface } from "../../../../../interfaces/forms.interface";
// Functions //
import { student_major_from_ID } from "../../../../../functions/information/students.function";
// Contexts //
import { useContext_Students } from "../../../../../contexts/Student.context";
// Constants //
import { hover_transition } from "../../../../../constants/styles/transition.style";
import { background_color_from_major, border_color_from_major, text_color_from_major } from "../../../../../constants/styles/colors/color_from_major.constant";

interface CurrentComponentProp {
	requestForm: RequestFormInterface;
	functionToRun: () => void;
}

const RequestForms_evaluate_button = (props: CurrentComponentProp) => {
	const { requestForm, functionToRun } = props;

	const { students } = useContext_Students();

	const studentMajor = student_major_from_ID(
		requestForm.request_form_student_ID,
		students.result
	);

	const { t } = useTranslation("forms_requestForms");

	return (
		<div>
			<button
				className={`border ${border_color_from_major[studentMajor]} ${text_color_from_major[studentMajor]} hover:${background_color_from_major[studentMajor]} hover:text-white shadow-sm px-4 py-2 rounded-xl ${hover_transition}`}
				onClick={() => {
					functionToRun();
				}}>
				{t("RequestForms_evaluate_button_title")}
			</button>
		</div>
	);
};

export default RequestForms_evaluate_button;
