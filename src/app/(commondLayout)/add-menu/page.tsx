import { AddMenuForm } from '@/components/module/add-menu/addMenuForm';
import { getAllCategory } from '@/server action/category.action'


export default async function AddMenuPage() {
   const {data, error} = await getAllCategory();
   console.log("this is category data", data);

  return (
    <div className='container mx-auto '>
        <AddMenuForm/>
    </div>
  )
}
