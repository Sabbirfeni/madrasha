import { Employee } from './_components/EmployeeListTable';

function generateEmployees(): Employee[] {
  const firstNames = [
    'Abdul',
    'Fatima',
    'Mohammad',
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
    'Nasir',
    'Rashida',
    'Hassan',
    'Amina',
    'Faisal',
    'Khadeeja',
    'Mansoor',
    'Ruqayya',
    'Saeed',
    'Umm Kulthum',
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

  const employmentTypes: Employee['employment_type'][] = [
    'Teachers',
    'Management',
    'Residential Staff',
    'Technical',
  ];
  const branches: Employee['branch'][] = ['Boys', 'Girls'];

  const employees: Employee[] = [];

  for (let i = 1; i <= 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const employmentType = employmentTypes[Math.floor(Math.random() * employmentTypes.length)];

    let branch: Employee['branch'];
    if (employmentType === 'Residential Staff') {
      branch = Math.random() > 0.2 ? 'Girls' : 'Boys';
    } else if (employmentType === 'Technical') {
      branch = Math.random() > 0.3 ? 'Boys' : 'Girls';
    } else {
      branch = branches[Math.floor(Math.random() * branches.length)];
    }

    const joinDate = new Date(
      2020 + Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    );
    const formattedJoinDate = joinDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    employees.push({
      id: i.toString(),
      employee_image: branch === 'Boys' ? '/male-teacher.png' : '/female-teacher.png',
      name: `${firstName} ${lastName}`,
      employment_type: employmentType,
      branch: branch,
      join_date: formattedJoinDate,
      phone: `01712-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }

  return employees;
}

export const allEmployees: Employee[] = generateEmployees();
