import { nextApi } from "@/lib/axios";
import { catchActionError } from "@/lib/catchActionError";
import { profileSchema } from "../definitions/profile.definitions";
import { ProfileActionState } from "../definitions/type";

export async function editProfileAction(
  prevState: ProfileActionState,
  formData: FormData
) {
  return catchActionError<ProfileActionState>(async () => {
    const rawData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      employee_id: formData.get("employee_id"),
      phone_number: formData.get("phone_number"),
      alternate_phone: formData.get("alternate_phone"),
      address: formData.get("address"),
      province: formData.get("province"),
      office_level: formData.get("office_level"),
      email: formData.get("email"),
    };
    const validatedData = profileSchema.parse(rawData);
    const data = validatedData;
    console.log("data", data);

    const response = await nextApi.put("/me", data);

    return {
      ...prevState,
      data: response.data,
      success: true,
      message: "Profile updated successfully",
    };
  });
}
