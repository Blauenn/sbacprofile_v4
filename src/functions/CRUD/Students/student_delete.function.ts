import axios from "axios";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";

export const student_delete = async (student_ID: number) => {
  const studentDelete = {
    id: student_ID,
  };
  const studentDeleteJSON = JSON.stringify(studentDelete);

  try {

		const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/student/delete`, studentDeleteJSON, {headers: { "Content-Type": "application/json" }})

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};