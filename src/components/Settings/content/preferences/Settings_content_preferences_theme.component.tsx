import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

const Settings_content_preferences_theme = () => {
	const { t } = useTranslation("page_settings");

	return (
		<div className="p-4 bg-white shadow-sm rounded-xl">
			<h1 className="mb-4 text-2xl font-semibold">
				<i className="fa-solid fa-brush me-4"></i>
				{t("preferences_theme_title")}
			</h1>
			<h1 className="mb-4 opacity-50">
				{t("preferences_theme_description")}
			</h1>
			<TextField
				name="settings_theme"
				select
				className="w-full"
				SelectProps={{ native: true }}
				InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}>
				<option value="1">{t("preferences_theme_option1")}</option>
				<option value="2">{t("preferences_theme_option2")}</option>
				<option value="3">{t("preferences_theme_option3")}</option>
			</TextField>
		</div>
	);
};

export default Settings_content_preferences_theme;
