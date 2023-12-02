import fade_transition from "../../../animations/fade_transition.transition";
// Functions //
import { randomize_length } from "../../../functions/randomize.function";
// Components //
import Skeleton_Admin_Classrooms_rolodex_card from "./card/Skeleton_Admin_Classrooms_rolodex_card.component";

const Skeleton_Admin_Classrooms_rolodex = () => {
	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{[...Array(randomize_length(3, 25))].map((_, index) => (
				<Skeleton_Admin_Classrooms_rolodex_card key={index} />
			))}
		</div>
	);
};

export default fade_transition(Skeleton_Admin_Classrooms_rolodex);