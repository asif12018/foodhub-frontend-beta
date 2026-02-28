"use client";

import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserTypes } from "@/src/constants/user.types";
import Link from "next/link";
interface ProfileIconProps {
  onLogout?: () => void;
  isLoggingOut?: boolean;
  userData?: any;
  sessionData?: any;
}

const ProfileIcon = ({
  onLogout,
  isLoggingOut,
  userData,
  sessionData
}: ProfileIconProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="relative h-10 w-10 rounded-full" variant="ghost">
        <Avatar>
          <AvatarImage
            alt="profile image"
            src={userData?.image || "https://github.com/haydenbleasel.png"}
          />
          <AvatarFallback>HB</AvatarFallback>
        </Avatar>
        <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-64">
      <DropdownMenuLabel className="font-normal">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              alt="@haydenbleasel"
              src="https://github.com/haydenbleasel.png"
            />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">
              {userData?.name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {userData?.email}
            </p>
            <Badge className="w-fit text-xs" variant="secondary">
              Pro
            </Badge>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        {
          userData?.roles === "Customer"  ? (
            <>
            <Link href="/profile" className="flex items-center gap-2"><User />
        View Profile</Link>
            </>
          ) : null
        }
      </DropdownMenuItem>
      {/* <DropdownMenuItem>
        <CreditCard />
        Billing
      </DropdownMenuItem> */}
      <DropdownMenuItem>
    
         {
          userData?.roles === "Customer"  && (
            <div className="flex items-center gap-1">
            <Settings />
            <Link href={"/editProfile"}>Edit Profile</Link>
     </div>
          )
         }
     
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        {isLoggingOut ? "Logging out..." : "Log out"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ProfileIcon;
