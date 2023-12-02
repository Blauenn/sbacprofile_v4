import fade_transition from "../../../animations/fade_transition.transition";
import Skeleton_Announcements_rolodex_card from "../card/Skeleton_Announcements_rolodex_card.component";

const Skeleton_Announcements_rolodex = () => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {[...Array(3)].map((_, index) => (
        <Skeleton_Announcements_rolodex_card key={index} />
      ))}
    </div>
  )
}

export default fade_transition(Skeleton_Announcements_rolodex);