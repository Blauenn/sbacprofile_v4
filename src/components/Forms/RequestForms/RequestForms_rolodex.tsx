import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RequestFormInterface } from "../../../interfaces/forms.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Contexts //
import { useContext_Students } from "../../../contexts/Student.context";
// Components //
import RequestForms_rolodex_card from "./card/RequestForms_rolodex_card.component";

interface CurrentComponentProp {
	requestForms: RequestFormInterface[];
}

const RequestForms_rolodex = (props: CurrentComponentProp) => {
	const { requestForms } = props;

	const { fetchStudents } = useContext_Students();

	useEffect(() => {
		fetchStudents();
	}, []);

	const { t } = useTranslation("forms_common");

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{requestForms.length ? (
				requestForms.map((requestForm: RequestFormInterface) => (
					<RequestForms_rolodex_card key={requestForm.request_form_ID} requestForm={requestForm} />
				))
			) : (
				<h1 className="text-xl opacity-50">{t("noRequestForms_message")}</h1>
			)}
		</div>
	);
};

export default fade_transition(RequestForms_rolodex);