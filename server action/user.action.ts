"use server"

import { userService } from "@/services/user.service";

export const userAction = async () => {
    const session = await userService.getSession();
    return session
}