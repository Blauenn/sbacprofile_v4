import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Functions //
import { upload_file } from "../file_upload.function";
import { validate_announcement } from "./validate_announcement.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const announcement_update = async (
  announcementUpdateObject: any,
  announcementImageObject: any,
  announcementImageName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const updatedAnnouncementToUpdate = {
    announcement_ID: announcementUpdateObject.announcement_ID,
    announcement_status: parseInt(
      announcementUpdateObject.announcement_status,
      10
    ),
    announcement_title: announcementUpdateObject.announcement_title,
    announcement_description: announcementUpdateObject.announcement_description,
    announcement_image: announcementUpdateObject.announcement_image,
  };

  const validation = validate_announcement(
    updatedAnnouncementToUpdate,
    setValidationErrors
  );

  // If the validation passes. //
  if (validation) {
    // Announcement image. //
    if (announcementImageObject != null) {
      await upload_file(
        announcementImageObject,
        announcementImageName,
        "/api/v1/upload/image/announcement"
      );
    }

    // Announcement information. //
    const announcementToUpdateObject = {
      id: updatedAnnouncementToUpdate.announcement_ID,
      announcementInfo: {
        announcement_status: updatedAnnouncementToUpdate.announcement_status,
        announcement_title: updatedAnnouncementToUpdate.announcement_title,
        announcement_description:
          updatedAnnouncementToUpdate.announcement_description,
        announcement_image: `/assets/files/announcements/${announcementImageName}`,
      },
    };
    const announcementUpdateJSON = JSON.stringify(
      announcementToUpdateObject
    );

    // Upload the announcement information. //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/announcement/update`, announcementUpdateJSON, {headers: { "Content-Type": "application/json" }});

      if (response.data.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};