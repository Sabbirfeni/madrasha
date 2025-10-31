import { authOptions } from '@/lib/auth';
import { getStudents } from '@/services/students';
import { getServerSession } from 'next-auth';

import { StudentListTable, studentListTableColumns } from './_components/StudentListTable';

const StudentsPage = async () => {
  const session = await getServerSession(authOptions);
  const response = await getStudents({
    accessToken: (session as typeof session & { accessToken?: string })?.accessToken,
  });

  if (!response) return;

  return (
    <main className="container mx-auto">
      <StudentListTable columns={studentListTableColumns} data={response.docs} title="Students" />
    </main>
  );
};

export default StudentsPage;
