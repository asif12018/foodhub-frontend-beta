
"use server"

import { providerStatsService } from "@/services/providerStats.service"





export const getProviderStatsAction = async ()=>{
    const result = await providerStatsService.getProviderStats();
    return result;
}