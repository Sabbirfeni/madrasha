import { StudentListTable, studentListTableColumns } from './_components/StudentListTable';
import { allStudents } from './students';

export default function Home() {
  return (
    <main className="container mx-auto">
      <StudentListTable columns={studentListTableColumns} data={allStudents} title="Students" />
    </main>
  );
}
