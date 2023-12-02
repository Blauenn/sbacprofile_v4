import { z } from "zod";

export const validate_requestForm = (
  requestFormObject: any,
  setValidationErrors: any
) => {
  const RequestFormSchema = z.object({
    request_form_title: z.string().min(1),
    request_form_description: z.string().min(1),
  });

  const validationErrors = {
    request_form_title: "",
    request_form_description: "",
  };

  const validationResult = RequestFormSchema.safeParse(requestFormObject);

  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      if (issue.path[0] === "request_form_title") {
        validationErrors.request_form_title = "The title should not be empty.";
      } else if (issue.path[0] === "request_form_description") {
        validationErrors.request_form_description =
          "The description should not be empty.";
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};