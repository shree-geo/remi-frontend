import InputElement from "@/components/molecules/Form/Input";
import EditContactForm from "./editContactForm";
import EditOfficeInformation from "./editOfficeInformation";

export default function EditProfileForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-lg font-normal">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputElement
            label={{
              tKey: "firstNameLabel",
              ns: "edit-profile",
            }}
            name="first_name"
            required
          />

          <InputElement
            label={{
              tKey: "lastNameLabel",
              ns: "edit-profile",
            }}
            name="last_name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputElement
            label={{
              tKey: "employeeIdLabel",
              ns: "edit-profile",
            }}
            name="employee_id"
            required
          />

          <InputElement
            label={{
              tKey: "emailLabel",
              ns: "edit-profile",
            }}
            name="email"
            required
          />
        </div>
      </div>

      <EditContactForm />

      <EditOfficeInformation />
    </div>
  );
}
