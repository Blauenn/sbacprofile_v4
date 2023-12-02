import { useState } from "react";
import { useTranslation } from "react-i18next";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { TextField_text, TextField_multiline } from "../../../Custom/Fields/Custom_TextFields";
// Functions //
import { handle_image_change } from "../../../../functions/fields.function";
import { announcement_create } from "../../../../functions/CRUD/Announcements/announcement_create.function";
// Contexts //
import { useContext_Announcements } from "../../../../contexts/Announcement.context";
import File_reset_button from "../../../miscellaneous/common/Buttons/File_reset_button.component";
// Components //
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";

interface CurrentComponentProp {
	open: boolean;
	onModalClose: () => void;
}

const Admin_Announcements_modal_create = (props: CurrentComponentProp) => {
	const { open, onModalClose } = props;

	const { fetchAnnouncements } = useContext_Announcements();

	const [announcementCreateObject, setAnnouncementCreateObject] = useState({
		announcement_title: "",
		announcement_description: "",
		announcement_status: 1,
		announcement_image: "",
		announcement_create_datetime: "",
	});
	const [validationErrors, setValidationErrors] = useState({
		announcement_status: "",
		announcement_title: "",
		announcement_description: "",
	});
	const [announcementCreateImage, setAnnouncementCreateImage] = useState(null);
	const [announcementCreateImageName, setAnnouncementCreateImageName] =
		useState("");

	const [imagePreview, setImagePreview] = useState("");
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreateSuccess, setIsCreateSuccess] = useState(false);

	const handleImageCancel = () => {
		setImagePreview("");
		setAnnouncementCreateImage(null);
		setAnnouncementCreateImageName("");
		setFileSizeNotice(false);
	};

	const handleModalClose = () => {
		setAnnouncementCreateObject({
			announcement_title: "",
			announcement_description: "",
			announcement_status: 1,
			announcement_image: "",
			announcement_create_datetime: "",
		});
		setValidationErrors({
			announcement_status: "",
			announcement_title: "",
			announcement_description: "",
		});
		setAnnouncementCreateImage(null);
		setAnnouncementCreateImageName("");

		setImagePreview("");
		setFileSizeNotice(false);

		setIsSubmitting(false);
		setIsCreateSuccess(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await announcement_create(
			announcementCreateObject,
			announcementCreateImage,
			announcementCreateImageName,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchAnnouncements(true);

			setIsSubmitting(false);
			setIsCreateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsCreateSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_announcements");

	return (
		<Custom_Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-plus"
			title={t("create_modal_header")}
			overflow>
			<div className="grid grid-cols-1 gap-4">
				{/* Announcement image */}
				<div className="flex flex-col gap-2">
					{announcementCreateImage ? (
						<div className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
							<div className="relative">
								<File_reset_button functionToRun={handleImageCancel} />
								<label htmlFor="announcement_image">
									<div className="flex items-center justify-center h-full">
										<img src={imagePreview} className="w-full h-auto" />
									</div>
									<input
										type="file"
										name="announcement_image"
										id="announcement_image"
										accept=".jpg, .jpeg, .png"
										hidden
										onChange={(event) => {
											handle_image_change(
												event,
												setImagePreview,
												setAnnouncementCreateImage,
												setFileSizeNotice,
												setAnnouncementCreateImageName
											);
										}}
									/>
								</label>
							</div>
						</div>
					) : (
						<div className="border border-standardBlack border-opacity-25 rounded-xl w-full min-h-[200px] overflow-auto">
							<label htmlFor="announcement_image">
								<div className="flex flex-row items-center justify-center w-full h-full gap-4">
									<i className="text-4xl fa-solid fa-image"></i>
									<h1 className="text-xl">
										{t("crud_modal_file_label")}
									</h1>
								</div>
								<input
									type="file"
									name="announcement_image"
									id="announcement_image"
									accept=".jpg, .jpeg, .png"
									hidden
									onChange={(event) => {
										handle_image_change(
											event,
											setImagePreview,
											setAnnouncementCreateImage,
											setFileSizeNotice,
											setAnnouncementCreateImageName
										);
									}}
								/>
							</label>
						</div>
					)}
					{fileSizeNotice && (
						<h1 className="mb-2 text-sm text-red-500">
							{t("crud_modal_file_fileSizeNotice_message")}
						</h1>
					)}
				</div>
				{/* Announcement title */}
				<TextField_text
					label={t("crud_modal_title_label")}
					name="announcement_title"
					className="col-span-1"
					object={announcementCreateObject}
					setObject={setAnnouncementCreateObject}
					value={announcementCreateObject.announcement_title}
					validation={validationErrors.announcement_title}
				/>
				{/* Announcement description */}
				<TextField_multiline
					label={t("crud_modal_description_label")}
					name="announcement_description"
					className="col-span-1"
					maxRows={4}
					object={announcementCreateObject}
					setObject={setAnnouncementCreateObject}
					value={announcementCreateObject.announcement_description}
					validation={validationErrors.announcement_description}
				/>
				{/* Submit button */}
				<Submit_button
					text={t("create_modal_submit_button_title")}
					successText={t(
						"create_modal_submit_success_message"
					)}
					icon="fa-solid fa-bullhorn"
					isSubmitting={isSubmitting}
					isSuccess={isCreateSuccess}
					onClickFunction={setObjectAndSubmit}
				/>
			</div>
		</Custom_Modal>
	);
};

export default Admin_Announcements_modal_create;
