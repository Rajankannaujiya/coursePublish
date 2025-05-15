// app/(dashboard)/make-user-instructor/page.tsx
import { getAllUser } from '@/app/actions/user';
import FindAllUsers from '../components/FindAllUsers';
import { ReturnTypeData } from '@/app/lib/globalType';
import { TypeBaseUserSchema } from '@/app/lib/globalType';

export default async function MakeUserInstructorPage() {
  const objOfUsers:ReturnTypeData<TypeBaseUserSchema[]>= await getAllUser();
 
  const users:TypeBaseUserSchema[] = objOfUsers?.data ?? []

  return <FindAllUsers users={users} />;
}
