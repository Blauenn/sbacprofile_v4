import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const requestForm_delete = async (request_form_ID: number) => {
  const requestFormToDelete = {
    id: request_form_ID,
  };
  const requestFormDeleteJSON = JSON.stringify(requestFormToDelete);

	// Delete the request form. //
  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/forms/requestForm/delete`, requestFormDeleteJSON, {headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};