import ChangePassword from "@/modules/changePassword";

export default function UserProfile() {
  return (
    <div className="grid grid-cols-12 w-full ">
      <div className="col-span-4 ">sidebar</div>
      <div className="col-span-8 ">
        <ChangePassword />
      </div>
    </div>
  );
}
