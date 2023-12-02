import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
// Functions //
import { handle_input_change } from "../../../../functions/fields.function";
import { account_password_update } from "../../../../functions/account/change_password.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

const Settings_content_account_password = () => {
	const { userInfo } = useContext_Account();

	const [isError, setIsError] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const [settingsPassword, setSettingsPassword] = useState({
		current_password: "",
		new_password: "",
		confirm_password: "",
	});

	const { t } = useTranslation("page_settings");

	return (
		<div className="p-4 bg-white shadow-sm rounded-xl">
			<h1 className="mb-4 text-2xl font-semibold">
				<i className="fa-solid fa-lock me-4"></i>
				{t("account_password_title")}
			</h1>
			<h1 className="mb-4 opacity-50">
				{t("account_password_description")}
			</h1>
			{/* Current password */}
			<div className="mb-2">
				<TextField
					label={t("account_password_label_currentPassword")}
					value={settingsPassword.current_password}
					onChange={(event) => {
						handle_input_change(event, settingsPassword, setSettingsPassword);
					}}
					name="current_password"
					className="w-full"
					InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}
					type="password"
				/>
			</div>
			{/* New password */}
			<div className="mt-8 mb-4">
				<TextField
					label={t("account_password_label_newPassword")}
					value={settingsPassword.new_password}
					onChange={(event) => {
						handle_input_change(event, settingsPassword, setSettingsPassword);
					}}
					name="new_password"
					className="w-full"
					InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}
					type="password"
				/>
			</div>
			{/* Confirm password */}
			<div className="mb-4">
				<TextField
					label={t("account_password_label_confirmPassword")}
					value={settingsPassword.confirm_password}
					onChange={(event) => {
						handle_input_change(event, settingsPassword, setSettingsPassword);
					}}
					name="confirm_password"
					className="w-full"
					InputProps={{ sx: { borderRadius: 3, background: "#FFFFFF" } }}
					type="password"
				/>
			</div>
			{isError != "" ? (
				<div className="mt-4 mb-8">
					<h1 className="text-md">
						<i className="text-red-500 fa-solid fa-circle-exclamation me-2"></i>
						{isError}
					</h1>
				</div>
			) : null}
			{isUpdateSuccess ? (
				<div className="mt-4 mb-8">
					<h1 className="text-md">
						<i className="text-green-500 fa-solid fa-circle-check me-2"></i>
						{t("account_password_updateSuccess")}
					</h1>
				</div>
			) : null}
			<div className="grid justify-end grid-cols-1">
				<Submit_button
					text={t("account_password_button")}
					successText={"account_password_submit_success_message"}
					disabled={Object.values(settingsPassword).some(
						(value) => value === ""
					)}
					icon={"fa-solid fa-lock hidden sm:inline-block"}
					isSubmitting={isUpdating}
					isSuccess={isUpdateSuccess}
					onClickFunction={() => {
						account_password_update(
							userInfo.profile_email,
							settingsPassword,
							setIsUpdating,
							setIsUpdateSuccess,
							setIsError,
							t
						);
					}}
				/>
			</div>
		</div>
	);
};

export default Settings_content_account_password;
