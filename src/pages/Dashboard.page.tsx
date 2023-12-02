 import { useTranslation } from 'react-i18next';
 import fade_transition from '../animations/fade_transition.transition';
// Functions //
import { get_text_from_position } from '../functions/account/account_info.function';
// Contexts //
import { useContext_Account } from '../contexts/Account.context';
// Components //
import Page_header from '../components/miscellaneous/common/Page_header.component';
import Dashboard_quickAccess_button_list from '../components/Dashboard/Buttons/Dashboard_quickAccess_button_list.component';
import Dashboard_selfInfo from '../components/Dashboard/Dashboard_selfInfo.component';

const Dashboard = () => {
	const { userInfo } = useContext_Account();

	const { t } = useTranslation("page_dashboard");

	return (
		<>
			<Page_header
				icon="fa-solid fa-bolt-lightning"
				text={t("header")}
			/>

			<div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-8">
				<div className="xl:col-span-6">
					<Dashboard_quickAccess_button_list
						profile={get_text_from_position(userInfo.profile_position)}
					/>
				</div>
				<div className="grid grid-cols-3 xl:col-span-2 xl:grid-cols-1">
					<div className="col-span-3 lg:col-span-2 xl:col-span-3">
						<Dashboard_selfInfo />
					</div>
				</div>
			</div>
		</>
	)
}

export default fade_transition(Dashboard);