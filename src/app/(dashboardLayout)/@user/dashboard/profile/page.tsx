import { getProfileDataAction } from "@/server action/profile.action";
import { Mail, MapPin, Phone, User, Edit } from "lucide-react";
import Link from "next/link";

export default async function UserProfilePage() {
  const { data: profileInfo } = await getProfileDataAction();
  const user = profileInfo || {};
  const profile = user.customerProfile || {};

  return (
    <div className="p-6 md:p-8 w-full max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-muted-foreground">Your personal information and details</p>
      </div>

      <div className="rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-linear-to-r from-primary/30 to-secondary relative" />

        {/* Avatar + Edit */}
        <div className="px-6 pb-6 -mt-12">
          <div className="flex items-end justify-between mb-4">
            <div className="h-24 w-24 rounded-full bg-primary/20 text-primary flex items-center justify-center text-4xl font-bold border-4 border-background shadow-md">
              {user.image ? (
                <img src={user.image} alt="avatar" className="h-full w-full rounded-full object-cover" />
              ) : (
                user.name ? user.name.charAt(0).toUpperCase() : <User className="w-10 h-10" />
              )}
            </div>
            <Link
              href="/editProfile"
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border hover:bg-muted transition-colors"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </Link>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{user.name || "—"}</h2>
              <p className="text-muted-foreground text-sm capitalize">{user.roles || "Customer"}</p>
            </div>

            <div className="h-px bg-border" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email || "—"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-secondary text-secondary-foreground rounded-xl">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.contactNo || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <div className="p-2.5 bg-muted text-foreground rounded-xl">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{profile.address || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
