import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { language_update } from "../../../../functions/Settings/language_update.function";

const Settings_content_preferences_language = () => {
	const { t } = useTranslation("page_settings");

	return (
		<div className="p-4 bg-white shadow-sm rounded-xl">
			<h1 className="mb-4 text-2xl font-semibold">
				<i className="fa-solid fa-globe me-4"></i>
				{t("preferences_language_title")}
			</h1>
			<h1 className="mb-4 opacity-50">
				{t("preferences_language_description")}
			</h1>
			<TextField
				name="settings_language"
				select
				className="w-full"
				SelectProps={{ native: true }}
				defaultValue={i18n.language}
				onChange={(event) => {
					language_update(event.target.value);
				}}
				InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
				<option value="en">English</option>
				<option value="de">Deutsch</option>
				<option value="th">ไทย</option>
			</TextField>
		</div>
	);
};

export default Settings_content_preferences_language;
