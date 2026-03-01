import { DataTable1 } from '@/components/data-table1';
import { getAllUserAction } from '@/server action/admin.action'
import React from 'react'

export default async function ManageUserPage() {
    const {data, error} = await getAllUserAction();
    console.log("get all user data", data?.data);
  return (
    <div>
        <DataTable1 data={data?.data} />
    </div>
  )
}
