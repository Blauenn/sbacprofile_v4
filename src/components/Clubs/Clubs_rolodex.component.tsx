import { ClubInterface } from "../../interfaces/clubs.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Components //
import Clubs_rolodex_card from "./card/Clubs_rolodex_card.component";

interface CurrentComponentProp {
	clubs: ClubInterface[];
}

const Clubs_rolodex = (props: CurrentComponentProp) => {
	const { clubs } = props;

	return (
		<div className="grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:mx-16 | grid gap-4">
			{clubs.map((club: ClubInterface) => (
				<Clubs_rolodex_card key={club.club_ID} club={club} />
			))}
		</div>
	);
};

export default fade_transition(Clubs_rolodex);