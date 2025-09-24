import { Student } from './_components/StudentListTable';

function generateStudents(): Student[] {
  const firstNames = [
    'Ahmad',
    'Fatima',
    'Yusuf',
    'Aisha',
    'Ibrahim',
    'Zainab',
    'Omar',
    'Sara',
    'Hamza',
    'Nadia',
    'Rahim',
    'Laila',
    'Khalid',
    'Mariam',
    'Tariq',
    'Jannat',
    'Bilal',
    'Sumaiya',
    'Javed',
    'Sabrina',
  ];
  const lastNames = [
    'Rahman',
    'Khan',
    'Ali',
    'Chowdhury',
    'Hossain',
    'Begum',
    'Farooq',
    'Jahan',
    'Siddique',
    'Islam',
    'Uddin',
    'Ahmed',
    'Haque',
    'Karim',
    'Mia',
    'Sultana',
    'Malik',
    'Akhtar',
    'Bano',
    'Qureshi',
  ];

  const sections: Student['section'][] = ['Nurani', 'Kitab', 'Najera'];
  const classes: Student['class'][] = [
    'Shishu',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
  ];

  const students: Student[] = [];

  for (let i = 1; i <= 150; i++) {
    const isBoy = Math.random() > 0.5;
    const branch: Student['branch'] = isBoy ? 'Boys' : 'Girls';
    const is_residential = isBoy ? Math.random() > 0.5 : false;

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const studentClass = classes[Math.floor(Math.random() * classes.length)];
    const section = sections[Math.floor(Math.random() * sections.length)];

    const startYear = 2015 + Math.floor(Math.random() * 9);
    const yearsEnrolled = Math.floor(Math.random() * 5) + 1;
    const enrollment_years = Array.from({ length: yearsEnrolled }, (_, idx) => startYear + idx);

    const guardianName = isBoy
      ? `${lastNames[Math.floor(Math.random() * lastNames.length)]} ${lastName}`
      : `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastName}`;

    students.push({
      id: i.toString(),
      student_image: isBoy ? '/diverse-student-boy.png' : '/diverse-student-girl.png',
      name: `${firstName} ${lastName}`,
      branch: branch,
      is_residential: is_residential,
      section: section,
      class: studentClass,
      enrollment_years: enrollment_years,
      guardian: {
        name: guardianName,
        phone: `01712-${Math.floor(100000 + Math.random() * 900000)}`,
      },
    });
  }

  return students;
}

export const allStudents: Student[] = generateStudents();
