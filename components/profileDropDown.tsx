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
  sessionData,
}: ProfileIconProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="relative h-10 w-10 rounded-full" variant="ghost">
        <Avatar>
          <AvatarImage
            alt="profile image"
            src={
              sessionData?.user?.image ||
              userData?.image ||
              "https://github.com/shadcn.png"
            }
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
              src={
                sessionData?.user?.image ||
                userData?.image ||
                "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">
              {sessionData?.user?.name || userData?.name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {sessionData?.user?.email || userData?.email}
            </p>
            <Badge className="w-fit text-xs" variant="secondary">
              {userData?.roles || "User"}
            </Badge>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {userData?.roles === "Customer" && (
        <>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/userStats" className="flex w-full items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>User Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile" className="flex w-full items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>View Profile</span>
            </Link>
          </DropdownMenuItem>
        </>
      )}

      {userData?.roles === "Provider" && (
        <DropdownMenuItem asChild>
          <Link href="/dashboard/providerStats" className="flex w-full items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Provider Dashboard</span>
          </Link>
        </DropdownMenuItem>
      )}

      {userData?.roles === "Admin" && (
        <DropdownMenuItem asChild>
          <Link href="/dashboard/adminStats" className="flex w-full items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Admin Dashboard</span>
          </Link>
        </DropdownMenuItem>
      )}
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        {isLoggingOut ? "Logging out..." : "Log out"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ProfileIcon;
