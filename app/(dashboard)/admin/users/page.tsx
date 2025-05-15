// app/(dashboard)/make-user-instructor/page.tsx
import { getAllUser } from '@/app/actions/user';
import { ReturnTypeData } from '@/app/lib/globalType';
import { TypeBaseUserSchema } from '@/app/lib/globalType';
import FindAllUsers from '../../components/FindAllUsers';
import CenterComp from '@/app/components/Centercomp';

export default async function MakeUserInstructorPage() {
  const objOfUsers:ReturnTypeData<TypeBaseUserSchema[]>= await getAllUser();
 
  const users:TypeBaseUserSchema[] = objOfUsers?.data ?? []

  console.log("user is", users)

  return (

      <CenterComp className='w-full lg:w-lg items-center justify-center' >
        <FindAllUsers users={users}/>
      </CenterComp>
  );
}
