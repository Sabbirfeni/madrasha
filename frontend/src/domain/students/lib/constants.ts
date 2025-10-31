import { StudentGender, StudentResidentialCategory } from '@/domain/students/enums';

export const STUDENT_RESIDENTIAL_CATEGORY_FEES: Record<StudentResidentialCategory, number> = {
  [StudentResidentialCategory.NORMAL]: 3000,
  [StudentResidentialCategory.MEDIUM]: 5000,
  [StudentResidentialCategory.VIP]: 8000,
};

export const STUDENT_PROFILE_PLACEHOLDERS: Record<StudentGender, string> = {
  [StudentGender.MALE]: '/diverse-student-boy.png',
  [StudentGender.FEMALE]: '/diverse-student-girl.png',
};
