import { z } from "zod";

export const profileSchema = z.object({
  first_name: z
    .string()
    .min(2, "error.minLengthFirstNameError")
    .nonempty("error.firstNameError"),
  last_name: z
    .string()
    .min(2, "error.minLengthLastNameError")
    .nonempty("error.lastNameError"),
  employee_id: z
    .string()
    .min(2, "error.minLengthEmployeeIdError")
    .nonempty("error.employeeIdError"),
  phone_number: z
    .string()
    .min(8, "error.minLengthPhoneNumberError")
    .max(15, "error.maxLengthPhoneNumberError")
    .nonempty("error.phoneNumberError"),
  alternate_phone: z.string().optional(),
  address: z
    .string()
    .min(2, "error.minLengthAddressError")
    .nonempty("error.addressError"),
  email: z.string().email().optional(),
  role: z.string().optional(),
  province: z.string().optional(),
  office_level: z.string().optional(),
});
