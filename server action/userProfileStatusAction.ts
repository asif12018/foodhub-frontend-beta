"use server"
import { userProfileStatusService } from "@/services/userProfileStatus.service"






export const getUserProfileStatusAction = async function (indentifier:string) {
    const res = await userProfileStatusService.getUserProfileStatus(indentifier);
    return res;
}

export const getUserProfileStatusAutoAction = async function () {
    const res = await userProfileStatusService.getUserProfileStatusAuto();
    return res;
}