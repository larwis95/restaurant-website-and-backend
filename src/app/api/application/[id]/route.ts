import { getApplicationById } from "@/lib/controllers/application/application.get";
import deleteApplication from "@/lib/controllers/application/application.delete";
import putApplication from "@/lib/controllers/application/application.put";

export {
  getApplicationById as GET,
  deleteApplication as DELETE,
  putApplication as PUT,
};
