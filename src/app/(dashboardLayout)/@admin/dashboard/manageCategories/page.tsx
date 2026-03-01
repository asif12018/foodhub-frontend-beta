import CategoryTable from '@/components/category-table';
import { getAllCategoryAdmin } from '@/server action/category.action'


export default async function MangeCategories() {
  const {data, error} = await getAllCategoryAdmin();
  console.log("this is all categories", data?.data);
  return (
    <div>
      <CategoryTable value={data?.data}></CategoryTable>
    </div>
  )
}
