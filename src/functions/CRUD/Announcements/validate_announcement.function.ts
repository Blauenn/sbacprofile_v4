import { z } from "zod";

export const validate_announcement = (
  announcementObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const AnnouncementSchema = z.object({
    announcement_status: z.number(),
    announcement_title: z.string().min(1),
    announcement_description: z.string().min(1),
    announcement_image: z.string(),
  });

  const validationErrors = {
    announcement_title: "",
    announcement_status: "",
    announcement_description: "",
  };

  // Perform validation and collect error messages. //
  const validationResult = AnnouncementSchema.safeParse(announcementObject);

  // If validation fails. //
  // Don't submit. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "announcement_title":
          validationErrors.announcement_title =
            "The title should not be empty.";
          break;
        case "announcement_description":
          validationErrors.announcement_description =
            "The description should not be empty.";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};