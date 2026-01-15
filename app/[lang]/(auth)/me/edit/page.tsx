import InputElement from "@/components/molecules/Form/Input";

export default function EditProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>

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
            disabled
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputElement
            label={{
              tKey: "phoneNumberLabel",
              ns: "edit-profile",
            }}
            name="phone_number"
            required
          />

          <InputElement
            label={{
              tKey: "alternatePhoneLabel",
              ns: "edit-profile",
            }}
            name="alternate_phone"
          />
        </div>

        <div className="grid grid-cols-1">
          <InputElement
            label={{
              tKey: "addressLabel",
              ns: "edit-profile",
            }}
            name="address"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Office Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputElement
            label={{
              tKey: "roleLabel",
              ns: "edit-profile",
            }}
            name="role"
            required
            disabled
          />

          <InputElement
            label={{
              tKey: "officeLevelLabel",
              ns: "edit-profile",
            }}
            name="office_level"
            required
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputElement
            label={{
              tKey: "provinceLabel",
              ns: "edit-profile",
            }}
            name="province"
            required
            disabled
          />

          <div className="opacity-50 cursor-not-allowed">
            <InputElement
              label={{
                tKey: "passwordLabel",
                ns: "edit-profile",
              }}
              name="password"
              type="password"
              required
              disabled
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
