import axios from "axios";
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";

export const requestForm_update = async (
  requestFormOriginalObject: any,
  requestFormUpdateObject: any,
  updateAs: number
  // Update as: //
  // 1. Teacher //
  // 2. Student //
  // 3. Head of department //
) => {
  const currentDate = new Date();

  // Get the data to turn them into JSON to update. //
  let requestFormToUpdateObject;
  // If head of department evaluates. //
  if (updateAs === 3) {
    requestFormToUpdateObject = {
      id: requestFormOriginalObject.request_form_ID,
      updateAs: 3,
      requestFormInfo: {
        request_form_head_ID: requestFormUpdateObject.teacher,
        request_form_head_status: requestFormUpdateObject.status,
        request_form_head_description: requestFormUpdateObject.description,
        request_form_head_change_datetime: currentDate,
      },
    };
  }
  // If the teacher evaluates. //
  else if (updateAs === 2) {
    requestFormToUpdateObject = {
      id: requestFormOriginalObject.request_form_ID,
      updateAs: 2,
      requestFormInfo: {
        // Updated values //
        request_form_teacher_ID: requestFormUpdateObject.teacher,
        request_form_teacher_status: requestFormUpdateObject.status,
        request_form_teacher_description: requestFormUpdateObject.description,
        request_form_teacher_change_datetime: currentDate,
      },
    };
  }
  const requestFormUpdateJSON = JSON.stringify(requestFormToUpdateObject);

  // Update the request form. //
  try {
		const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/forms/requestForm/update`, requestFormUpdateJSON, {headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};