'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Zod Schema
const employeeFormSchema = z
  .object({
    // General Information
    branch: z.string().min(1, 'Branch is required'),
    employment_type: z.string().min(1, 'Employment type is required'),
    designation: z.string().min(1, 'Designation is required'),
    profile_image: z.string().min(1, 'Profile image is required'),
    fullname: z.string().min(1, 'Full name is required'),
    nid_no: z.string().min(1, 'NID number is required'),
    gender: z.string().min(1, 'Gender is required'),
    phone_number: z.string().min(1, 'Phone number is required'),
    join_date: z.string().min(1, 'Join date is required'),
    resign_date: z.string().optional(),
    salary: z.coerce.number().min(1, 'Salary must be greater than 0'),
    bonus: z.coerce.number().min(0, 'Bonus must be positive'),
    current_location: z.string().min(1, 'Current location is required'),
    permanent_location: z.string().min(1, 'Permanent location is required'),
  })
  .superRefine((data, ctx) => {
    // Salary validation
    if (data.salary === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Salary must be greater than 0',
        path: ['salary'],
      });
    } else if (data.salary < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Salary must be greater than 0',
        path: ['salary'],
      });
    }

    // Bonus validation
    if (data.bonus < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bonus must be positive',
        path: ['bonus'],
      });
    }
  });

type EmployeeFormData = z.infer<typeof employeeFormSchema>;

type EmploymentType = {
  value: string;
  label: string;
  designations: string[];
};

const employmentTypes: EmploymentType[] = [
  {
    value: 'Teacher',
    label: 'Teacher',
    designations: [
      'Subject Teachers (Arabic, Quran, Hadith, Fiqh, etc.)',
      'General Subjects Teachers (Math, English, etc.)',
      'Hifz Teachers',
      'Assistant Teachers',
      "Mu'allim / Mu'allima",
    ],
  },
  {
    value: 'Management',
    label: 'Management',
    designations: [
      'Principal / Head (Muhtamim)',
      'Vice Principal / Naib Muhtamim',
      'Office Administrator',
      'Accountant',
    ],
  },
  {
    value: 'Operational Staff',
    label: 'Operational Staff',
    designations: [
      'Librarian',
      'Lab Assistant (if modern subjects are taught)',
      'Office Assistant',
      'Peon',
      'Driver',
      'Cook / Kitchen Staff',
      'Gardener',
      'Watchman / Guard',
      'Hostel Matron / Hostel In-charge',
    ],
  },
  {
    value: 'Residential Staff',
    label: 'Residential Staff',
    designations: [
      'Hostel Matron',
      'Hostel In-charge',
      'Residential Supervisor',
      'Dormitory Manager',
    ],
  },
  {
    value: 'Technical',
    label: 'Technical',
    designations: ['IT Admin', 'Web Admin', 'System Support'],
  },
];

export default function AddEmployeePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    // @ts-expect-error - Type mismatch between Zod and react-hook-form
    resolver: zodResolver(employeeFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      branch: '',
      employment_type: '',
      designation: '',
      profile_image: '',
      fullname: '',
      nid_no: '',
      gender: '',
      phone_number: '',
      join_date: '',
      resign_date: '',
      salary: 0,
      bonus: 0,
      current_location: '',
      permanent_location: '',
    },
  });

  const watchedValues = watch();

  const onSubmit = async () => {
    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
    setIsSaving(false);
    setImagePreview(null);
    setHasAttemptedSubmit(false);
  };

  const handleFormSubmit = () => {
    setHasAttemptedSubmit(true);
    handleSubmit(onSubmit)();
  };

  const handleEmploymentTypeChange = (employmentType: string) => {
    setValue('employment_type', employmentType, { shouldValidate: true });
    // Reset designation when employment type changes
    setValue('designation', '', { shouldValidate: true });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setValue('profile_image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Calculate total salary
  const totalSalary = (Number(watchedValues.salary) || 0) + (Number(watchedValues.bonus) || 0);

  // Get designations for selected employment type
  const selectedEmploymentType = employmentTypes.find(
    (type) => type.value === watchedValues.employment_type,
  );
  const availableDesignations = selectedEmploymentType?.designations || [];

  return (
    <div className="container mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar className="h-30 w-30 cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage
                src={imagePreview || watchedValues.profile_image}
                alt={watchedValues.fullname || 'Employee'}
              />
              <AvatarFallback className="text-md">
                {watchedValues.fullname
                  ? watchedValues.fullname
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'EM'}
              </AvatarFallback>
            </Avatar>
            <div
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Camera className="h-8 w-8 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{watchedValues.fullname || 'New Employee'}</h1>
            <p className="text-muted-foreground">
              {watchedValues.employment_type && watchedValues.designation
                ? `${watchedValues.employment_type} - ${watchedValues.designation}`
                : 'Enter employee details'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleFormSubmit} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving Employee...' : 'Save Employee'}
          </Button>
        </div>
      </div>

      {/* Profile Image Required Message */}
      {hasAttemptedSubmit && !imagePreview && !watchedValues.profile_image && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent>
            <div className="flex items-center gap-2 text-destructive">
              <Camera className="h-4 w-4" />
              <p className="text-sm font-medium">
                Profile image is required. Please upload an employee photo.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>Basic employee information and employment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-md" htmlFor="branch">
                Branch <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watchedValues.branch}
                onValueChange={(value) => setValue('branch', value, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                </SelectContent>
              </Select>
              {hasAttemptedSubmit && errors.branch && (
                <p className="text-sm text-destructive">{errors.branch.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="employment_type">
                Employment Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watchedValues.employment_type}
                onValueChange={handleEmploymentTypeChange}
              >
                <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasAttemptedSubmit && errors.employment_type && (
                <p className="text-sm text-destructive">{errors.employment_type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="designation">
                Designation <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watchedValues.designation}
                onValueChange={(value) => setValue('designation', value, { shouldValidate: true })}
                disabled={!watchedValues.employment_type}
              >
                <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                  <SelectValue placeholder="Select employment type first" />
                </SelectTrigger>
                <SelectContent>
                  {availableDesignations.map((designation) => (
                    <SelectItem key={designation} value={designation}>
                      {designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasAttemptedSubmit && errors.designation && (
                <p className="text-sm text-destructive">{errors.designation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="fullname">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                {...register('fullname')}
                placeholder="Enter full name"
              />
              {hasAttemptedSubmit && errors.fullname && (
                <p className="text-sm text-destructive">{errors.fullname.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="nid_no">
                NID Number <span className="text-destructive">*</span>
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                {...register('nid_no')}
                placeholder="Enter NID number"
              />
              {hasAttemptedSubmit && errors.nid_no && (
                <p className="text-sm text-destructive">{errors.nid_no.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="gender">
                Gender <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watchedValues.gender}
                onValueChange={(value) => setValue('gender', value, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {hasAttemptedSubmit && errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="phone_number">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                {...register('phone_number')}
                placeholder="Enter phone number"
              />
              {hasAttemptedSubmit && errors.phone_number && (
                <p className="text-sm text-destructive">{errors.phone_number.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="join_date">
                Join Date <span className="text-destructive">*</span>
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                type="date"
                {...register('join_date')}
              />
              {hasAttemptedSubmit && errors.join_date && (
                <p className="text-sm text-destructive">{errors.join_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="resign_date">
                Resign Date
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                type="date"
                {...register('resign_date')}
              />
              {hasAttemptedSubmit && errors.resign_date && (
                <p className="text-sm text-destructive">{errors.resign_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="current_location">
                Current Location <span className="text-destructive">*</span>
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                {...register('current_location')}
                placeholder="Enter current location"
              />
              {hasAttemptedSubmit && errors.current_location && (
                <p className="text-sm text-destructive">{errors.current_location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="permanent_location">
                Permanent Location <span className="text-destructive">*</span>
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                {...register('permanent_location')}
                placeholder="Enter permanent location"
              />
              {hasAttemptedSubmit && errors.permanent_location && (
                <p className="text-sm text-destructive">{errors.permanent_location.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Information</CardTitle>
          <CardDescription>Employee salary details and compensation information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-md" htmlFor="salary">
                Salary <span className="text-destructive">*</span>
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                type="number"
                {...register('salary')}
                placeholder="Enter salary amount"
              />
              {hasAttemptedSubmit && errors.salary && (
                <p className="text-sm text-destructive">{errors.salary.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="bonus">
                Bonus
              </Label>
              <Input
                className="bg-muted/40 dark:bg-input/40"
                type="number"
                {...register('bonus')}
                placeholder="Enter bonus amount"
              />
              {hasAttemptedSubmit && errors.bonus && (
                <p className="text-sm text-destructive">{errors.bonus.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="total_salary">
                Total Salary
              </Label>
              <div className="p-2 text-md bg-primary/10 font-semibold rounded-md">
                ৳{totalSalary.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
