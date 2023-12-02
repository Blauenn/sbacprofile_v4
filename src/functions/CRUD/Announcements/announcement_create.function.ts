import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Functions //
import { upload_file } from "../file_upload.function";
import { validate_announcement } from "./validate_announcement.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const announcement_create = async (
  announcementCreateObject: any,
  announcementImageObject: any,
  announcementImageName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const validation = validate_announcement(
    announcementCreateObject,
    setValidationErrors
  );

  // If the validation passes. //
  if (validation) {
    // Announcement image //
    if (announcementImageObject != null) {
      await upload_file(
        announcementImageObject,
        announcementImageName,
        "/api/v1/upload/image/announcement"
      );
    }

    // Announcement information //
    const announcementToCreateObject = {
      announcement_status: announcementCreateObject.announcement_status,
      announcement_title: announcementCreateObject.announcement_title,
      announcement_description:
        announcementCreateObject.announcement_description,
      announcement_image: `/assets/files/announcements/${announcementImageName}`,
    };
    const announcementCreateJSON = JSON.stringify(
      announcementToCreateObject
    );

    // Upload the announcement information. //
    try {
			const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/announcement/create`, announcementCreateJSON, {headers: { "Content-Type": "application/json" }});

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