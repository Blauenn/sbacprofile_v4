import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const announcement_delete = async (announcement_ID: number) => {
  const announcementToDelete = {
    id: announcement_ID,
  };
  const announcementDeleteJSON = JSON.stringify(announcementToDelete);

  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/announcement/delete`, announcementDeleteJSON, {headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};