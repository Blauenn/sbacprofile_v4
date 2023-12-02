import { useTranslation } from "react-i18next";
import { hover_transition } from "../../../../constants/styles/transition.style";

interface CurrentComponentProp {
	functionToRun: () => void;
}

const RequestForms_delete_button = (props: CurrentComponentProp) => {
	const { functionToRun } = props;

	const { t } = useTranslation("forms_requestForms");

	return (
		<div>
			<button
				className={`border border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-sm px-4 py-2 rounded-xl ${hover_transition}`}
				onClick={() => {
					functionToRun();
				}}>
				{t("delete_button_title")}
			</button>
		</div>
	);
};

export default RequestForms_delete_button;