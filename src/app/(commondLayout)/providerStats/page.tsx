import ProviderStats from '@/components/module/stats-section/providerStats';
import { getProviderStatsAction } from '@/server action/providerStats.action'
import React from 'react'

export default async function ProviderStatsPage() {
    const {data, error} = await getProviderStatsAction();
    console.log('this is provider stats', data);
  return (
    <div>
        <ProviderStats data={data?.data} />
    </div>
  )
}
