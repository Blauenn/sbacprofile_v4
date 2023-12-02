import { NavLink } from 'react-router-dom';
import { AnnouncementInterface } from '../../interfaces/common.interface';
import fade_transition from '../../animations/fade_transition.transition';
// Components //
import Announcements_rolodex_card from '../Announcements/card/Announcements_rolodex_card.component';
// Constants //
import { hover_transition } from '../../constants/styles/transition.style';

interface CurrentComponentProp {
    latestAnnouncement: AnnouncementInterface;
}

const Home_announcements = (props: CurrentComponentProp) => {
    const { latestAnnouncement } = props;

    return (
        <div className="grid grid-cols-4">
            <div
                className={`col-span-4 lg:col-span-2 bg-white shadow-sm rounded-xl w-full overflow-hidden group ${hover_transition} hover:bg-slate-200 cursor-pointer`}>
                <NavLink to="/announcements">
                    <Announcements_rolodex_card
                        announcement={latestAnnouncement}
                    />
                </NavLink>
            </div>
        </div>
    )
}

export default fade_transition(Home_announcements);