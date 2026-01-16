import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfileAvatar() {
  return (
    <div className="flex items-center gap-4 p-4">
      <Avatar className="h-30 w-30">
        <AvatarFallback className="text-2xl">SA</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Saheel Mahzz</h2>
        <p className="text-sm text-gray-600">iamsaheel@yopmail.com</p>
        <div className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
          Admin
        </div>
      </div>
    </div>
  );
}
