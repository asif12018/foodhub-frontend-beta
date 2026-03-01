"use server";
import { revalidatePath } from "next/cache";

import { profileService } from "@/services/profile.service";

export const getProfileDataAction = async () => {
  const result = await profileService.getProfileData();
  return result;
};

export const updateProfileAction = async (payload: any) => {
  const result = await profileService.updateProfile(payload);
  revalidatePath("/profile");
  revalidatePath("/editProfile");
  return result;
};

export const getProviderProfileByIdAction = async (providerId:string)=>{
  const result = await profileService.getProviderProfileById(providerId);
  return result;
}


