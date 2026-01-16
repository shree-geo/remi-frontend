import STranslation from "@/components/molecules/translations/STranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EditProfileForm from "./components/editProfileForm";

export default function EditProfile() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <STranslation tKey="title" ns="edit-profile" className="text-xl" />
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <EditProfileForm />
        </CardContent>
      </Card>
    </>
  );
}
