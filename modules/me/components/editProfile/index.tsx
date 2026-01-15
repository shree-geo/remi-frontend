import Text from "@/components/molecules/text";
import STranslation from "@/components/molecules/translations/STranslation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EditProfileForm from "./components/editProfileForm";

export default function EditProfile() {
  return (
    <>
      <Text size="lead" className=" text-xl text-black font-medium">
        <STranslation ns="edit-profile" tKey="title" />
      </Text>
      <Separator className="my-2" />
      <EditProfileForm />
      <Button className="my-3">Save</Button>
    </>
  );
}
