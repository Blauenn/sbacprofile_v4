import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Functions //
import { upload_file } from "../../file_upload.function";
import { validate_requestForm } from "./validate_requestForm.function";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const requestForm_create = async (
  requestFormCreateObject: any,
  request_form_student_ID: number,
  requestFormFile: any,
  requestFormFileName: string,
  setValidationErrors: any
) => {
  // Perform the validation //
  const validation = validate_requestForm(
    requestFormCreateObject,
    setValidationErrors
  );

  // If validation passes //
  if (validation) {
    // Upload the file //
    if (requestFormFile) {
      upload_file(
        requestFormFile,
        requestFormFileName,
        "/api/v1/upload/file/requestForm"
      );
    }

    // Upload the request form information. //
    const requestFormToCreateObject = {
      request_form_student_ID: request_form_student_ID,
      request_form_title: requestFormCreateObject.request_form_title,
      request_form_description:
        requestFormCreateObject.request_form_description,
      request_form_attached_file: requestFormFile
        ? `/assets/files/requestForms/${requestFormFileName}`
        : "",
    };
		console.log(requestFormToCreateObject)
    const requestFormCreateJSON = JSON.stringify(requestFormToCreateObject);

    // Create the request form. //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/forms/requestForm/create`, requestFormCreateJSON, {headers: { "Content-Type": "application/json" }});

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