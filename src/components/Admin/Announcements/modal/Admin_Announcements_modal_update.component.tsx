import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField_select, TextField_text, TextField_multiline } from "../../../Custom/Fields/Custom_TextFields";
import Custom_Modal from "../../../Custom/Custom_Modal";
import { AnnouncementInterface } from "../../../../interfaces/common.interface";
// Functions //
import { handle_image_change } from "../../../../functions/fields.function";
import { announcement_update } from "../../../../functions/CRUD/Announcements/announcement_update.function";
// Contexts //
import { useContext_Announcements } from "../../../../contexts/Announcement.context";
// Components //
import File_reset_button from "../../../miscellaneous/common/Buttons/File_reset_button.component";
import Submit_button from "../../../miscellaneous/common/Buttons/Submit_button.component";
// Constants //
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import Custom_Button from "../../../Custom/Custom_Button";
import Admin_Announcements_modal_delete from "./Admin_Announcements_modal_delete.component";

interface CurrentComponentProp {
	announcement: AnnouncementInterface;
	open: boolean;
	onModalClose: () => void;
}

const Admin_Announcements_modal_update = (props: CurrentComponentProp) => {
	const { open, onModalClose, announcement } = props;

	const { fetchAnnouncements } = useContext_Announcements();

	const [announcementUpdateObject, setAnnouncementUpdateObject] = useState({
		announcement_ID: announcement.announcement_ID,
		announcement_status: announcement.announcement_status,
		announcement_title: announcement.announcement_title,
		announcement_description: announcement.announcement_description,
		announcement_create_datetime: announcement.announcement_create_datetime,
		announcement_image: announcement.announcement_image,
	});
	const [validationErrors, setValidationErrors] = useState({
		announcement_ID: "",
		announcement_status: "",
		announcement_title: "",
		announcement_description: "",
		announcement_create_datetime: "",
		announcement_image: "",
	});
	const [announcementImage, setAnnouncementImage] = useState(null);
	const [announcementImageName, setAnnouncementImageName] = useState("");

	const [imagePreview, setImagePreview] = useState("");
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const handleImageCancel = () => {
		setImagePreview("");
		setAnnouncementImage(null);
		setAnnouncementImageName("");
		setFileSizeNotice(false);
	};

	const handleModalClose = () => {
		setAnnouncementUpdateObject({
			announcement_ID: announcement.announcement_ID,
			announcement_status: announcement.announcement_status,
			announcement_title: announcement.announcement_title,
			announcement_description: announcement.announcement_description,
			announcement_create_datetime: announcement.announcement_create_datetime,
			announcement_image: announcement.announcement_image,
		});
		setValidationErrors({
			announcement_ID: "",
			announcement_status: "",
			announcement_title: "",
			announcement_description: "",
			announcement_create_datetime: "",
			announcement_image: "",
		});
		setAnnouncementImage(null);
		setAnnouncementImageName("");

		setImagePreview("");
		setFileSizeNotice(false);

		setIsSubmitting(false);
		setIsUpdateSuccess(false);

		onModalClose();
	};

	const originalImageName = announcement.announcement_image.replace(
		/^\/assets\/files\/announcements\//,
		""
	);

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		// Check if the image is updated or not. //
		let imageNameToUpdate;
		if (announcementImage) {
			imageNameToUpdate = announcementImageName;
		} else {
			imageNameToUpdate = originalImageName;
		}

		const submissionStatus = await announcement_update(
			announcementUpdateObject,
			announcementImage,
			imageNameToUpdate,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchAnnouncements(true);

			setIsSubmitting(false);
			setIsUpdateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsUpdateSuccess(false);
		}
	};

	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const onDeleteModalClose = () => {
		setDeleteModalOpen(false);
	};

	const { t } = useTranslation("crud_modal_announcements");

	return (
		<Custom_Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-pencil"
			title={t("update_modal_header")}
			overflow>
			<div className="grid grid-cols-1 gap-4">
				{/* Announcement image */}
				<div className="flex flex-col gap-1">
					{announcementImage ? (
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
												setAnnouncementImage,
												setFileSizeNotice,
												setAnnouncementImageName
											);
										}}
									/>
								</label>
							</div>
						</div>
					) : announcement.announcement_image !==
						"/assets/files/announcements/" ? (
						<div className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
							<div className="relative">
								<label htmlFor="announcement_image">
									<div className="flex items-center justify-center h-full">
										<img
											src={`${CDN_ENDPOINT}${announcement.announcement_image}`}
										/>
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
												setAnnouncementImage,
												setFileSizeNotice,
												setAnnouncementImageName
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
											setAnnouncementImage,
											setFileSizeNotice,
											setAnnouncementImageName
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
				{/* Announcement status */}
				<TextField_select
					label={t("crud_modal_status_label")}
					name="announcement_status"
					className="col-span-1"
					object={announcementUpdateObject}
					setObject={setAnnouncementUpdateObject}
					value={announcementUpdateObject.announcement_status}
					validation={validationErrors.announcement_status}>
					<option value="1">
						{t("crud_modal_status_option1")}
					</option>
					<option value="2">
						{t("crud_modal_status_option2")}
					</option>
				</TextField_select>
				{/* Announcement title */}
				<TextField_text
					label={t("crud_modal_title_label")}
					name="announcement_title"
					className="col-span-1"
					object={announcementUpdateObject}
					setObject={setAnnouncementUpdateObject}
					value={announcementUpdateObject.announcement_title}
					validation={validationErrors.announcement_title}
				/>
				{/* Announcement description */}
				<TextField_multiline
					label={t("crud_modal_description_label")}
					name="announcement_description"
					className="col-span-1"
					maxRows={4}
					object={announcementUpdateObject}
					setObject={setAnnouncementUpdateObject}
					value={announcementUpdateObject.announcement_description}
					validation={validationErrors.announcement_description}
				/>
			</div>
			<div className="flex flex-col gap-4">
				{/* Submit button */}
				<Submit_button
					text={t("update_modal_submit_button_title")}
					successText={t(
						"update_modal_submit_success_message"
					)}
					icon="fa-solid fa-pencil"
					isSubmitting={isSubmitting}
					isSuccess={isUpdateSuccess}
					onClickFunction={() => {
						setObjectAndSubmit();
					}}
				/>
				{/* Delete button */}
				<Custom_Button
					text={t("update_modal_delete_button_title")}
					color="border-red-500 text-red-500 hover:bg-red-500"
					icon="fa-solid fa-trash-can"
					setModalOpen={setDeleteModalOpen} />
				<Admin_Announcements_modal_delete announcement={announcement} open={deleteModalOpen} onModalClose={onDeleteModalClose} />
			</div>
		</Custom_Modal>
	);
};

export default Admin_Announcements_modal_update;
