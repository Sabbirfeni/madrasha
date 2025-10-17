export type Donation = {
  id: string;
  donorName: string;
  type: 'Membership' | 'Sadka' | 'Jakat';
  addedBy: string;
  date: string;
  amount: number;
};

export const allDonations: Donation[] = [
  {
    id: '1',
    donorName: 'Ahmed Rahman',
    type: 'Membership',
    addedBy: 'Admin User',
    date: '2024-01-15',
    amount: 5000,
  },
  {
    id: '2',
    donorName: 'Fatima Begum',
    type: 'Sadka',
    addedBy: 'Admin User',
    date: '2024-01-14',
    amount: 2000,
  },
  {
    id: '3',
    donorName: 'Mohammad Ali',
    type: 'Jakat',
    addedBy: 'Admin User',
    date: '2024-01-13',
    amount: 10000,
  },
  {
    id: '4',
    donorName: 'Ayesha Khan',
    type: 'Membership',
    addedBy: 'Admin User',
    date: '2024-01-12',
    amount: 3000,
  },
  {
    id: '5',
    donorName: 'Abdul Karim',
    type: 'Sadka',
    addedBy: 'Admin User',
    date: '2024-01-11',
    amount: 1500,
  },
  {
    id: '6',
    donorName: 'Nusrat Jahan',
    type: 'Jakat',
    addedBy: 'Admin User',
    date: '2024-01-10',
    amount: 7500,
  },
  {
    id: '7',
    donorName: 'Hasan Mahmud',
    type: 'Membership',
    addedBy: 'Admin User',
    date: '2024-01-09',
    amount: 4000,
  },
  {
    id: '8',
    donorName: 'Rashida Khatun',
    type: 'Sadka',
    addedBy: 'Admin User',
    date: '2024-01-08',
    amount: 2500,
  },
  {
    id: '9',
    donorName: 'Ibrahim Hossain',
    type: 'Jakat',
    addedBy: 'Admin User',
    date: '2024-01-07',
    amount: 12000,
  },
  {
    id: '10',
    donorName: 'Salma Akter',
    type: 'Membership',
    addedBy: 'Admin User',
    date: '2024-01-06',
    amount: 3500,
  },
  {
    id: '11',
    donorName: 'Kamal Uddin',
    type: 'Sadka',
    addedBy: 'Admin User',
    date: '2024-01-05',
    amount: 1800,
  },
  {
    id: '12',
    donorName: 'Nasima Begum',
    type: 'Jakat',
    addedBy: 'Admin User',
    date: '2024-01-04',
    amount: 9000,
  },
  {
    id: '13',
    donorName: 'Rafiqul Islam',
    type: 'Membership',
    addedBy: 'Admin User',
    date: '2024-01-03',
    amount: 6000,
  },
  {
    id: '14',
    donorName: 'Shahida Parvin',
    type: 'Sadka',
    addedBy: 'Admin User',
    date: '2024-01-02',
    amount: 2200,
  },
  {
    id: '15',
    donorName: 'Mizanur Rahman',
    type: 'Jakat',
    addedBy: 'Admin User',
    date: '2024-01-01',
    amount: 15000,
  },
];
