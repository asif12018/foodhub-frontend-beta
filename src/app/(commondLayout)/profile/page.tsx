import { SettingsProfile1 } from "@/components/module/profileCard/profileCard";
import { getProfileDataAction } from "@/server action/profile.action";

export default async function ProfilePage() {
  const { data, error } = await getProfileDataAction();
  console.log("this is profile data", data?.data);
  return (
    <div className="container mx-auto ">
      <div className="flex justify-center items-center">
        <SettingsProfile1 profileData={data?.data} />
      </div>
    </div>
  );
}
