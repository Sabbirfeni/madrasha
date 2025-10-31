import {
  StudentBloodGroup,
  StudentClass,
  StudentGender,
  StudentGroup,
  StudentResidentialCategory,
  StudentSection,
} from '@/domain/students/enums';
import {
  STUDENT_BLOOD_GROUP_LABELS,
  STUDENT_CLASS_LABELS,
  STUDENT_GENDER_LABELS,
  STUDENT_GROUP_LABELS,
  STUDENT_RESIDENTIAL_CATEGORY_LABELS,
  STUDENT_SECTION_LABELS,
} from '@/domain/students/lib/labels';

const normalize = (value: string) => value.trim().toLowerCase();

export const parseStudentSectionLabel = (label: string): StudentSection | null => {
  const normalized = normalize(label);
  const match = (Object.entries(STUDENT_SECTION_LABELS) as Array<[string, string]>).find(
    ([, display]) => normalize(display) === normalized,
  );
  return match ? (Number.parseInt(match[0], 10) as StudentSection) : null;
};

export const parseStudentGroupLabel = (label: string): StudentGroup | null => {
  const normalized = normalize(label);
  const match = (Object.entries(STUDENT_GROUP_LABELS) as Array<[string, string]>).find(
    ([, display]) => normalize(display) === normalized,
  );
  return match ? (Number.parseInt(match[0], 10) as StudentGroup) : null;
};

export const parseStudentClassLabel = (label: string): StudentClass | null => {
  const normalized = normalize(label);
  const match = (Object.entries(STUDENT_CLASS_LABELS) as Array<[string, string]>).find(
    ([, display]) => normalize(display) === normalized,
  );
  return match ? (Number.parseInt(match[0], 10) as StudentClass) : null;
};

export const parseStudentGenderLabel = (label: string): StudentGender | null => {
  const normalized = normalize(label);
  const match = (Object.entries(STUDENT_GENDER_LABELS) as Array<[StudentGender, string]>).find(
    ([value, display]) => normalize(display) === normalized || normalize(value) === normalized,
  );
  return match ? match[0] : null;
};

export const parseStudentBloodGroupLabel = (label: string): StudentBloodGroup | null => {
  const normalized = normalize(label);
  const match = (
    Object.entries(STUDENT_BLOOD_GROUP_LABELS) as Array<[StudentBloodGroup, string]>
  ).find(
    ([value, display]) => normalize(display) === normalized || normalize(value) === normalized,
  );
  return match ? match[0] : null;
};

export const parseResidentialCategoryLabel = (label: string): StudentResidentialCategory | null => {
  const normalized = normalize(label);
  const match = (
    Object.entries(STUDENT_RESIDENTIAL_CATEGORY_LABELS) as Array<
      [StudentResidentialCategory, string]
    >
  ).find(
    ([value, display]) => normalize(display) === normalized || normalize(value) === normalized,
  );
  return match ? match[0] : null;
};
