import { z } from "zod";

export const Announcement_schema = z.object({
  announcement_ID: z.number(),
  announcement_status: z.number(),
  announcement_title: z.string(),
  announcement_description: z.string(),
  announcement_image: z.string(),
  announcement_create_datetime: z.string(),
});
