'use client';

import { formatDate } from '@/lib/date-utils';
import { Camera, Edit2, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

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

// Types
type StudentDetailsFormData = {
  // General Information
  branch: string;
  profile_image: string;
  full_name: string;
  blood_group: string;
  birth_certificate_no: string;
  gender: string;
  registration_date: string;
  section_name: string;
  group_name: string;
  class_name: string;
  roll: string;
  current_location: string;
  permanent_location: string;
  day_care: boolean;
  residential: boolean;
  residential_category: string;

  // Fee Information
  class_fee: number;
  residential_fee: number;
  webinars_amount: number;
  total: number;

  // Guardian Information
  guardian_name: string;
  guardian_relation: string;
  phone_number: string;
  alternative_phone_number: string;
  guardian_current_location: string;
  guardian_permanent_location: string;
};

type ResidentialCategory = {
  name: string;
  fee: number;
};

const residentialCategories: ResidentialCategory[] = [
  { name: 'Normal', fee: 3000 },
  { name: 'Medium', fee: 5000 },
  { name: 'VIP', fee: 8000 },
];

// Mock data
const mockStudentData: StudentDetailsFormData = {
  branch: 'Boys',
  profile_image: '/diverse-student-boy.png',
  full_name: 'Ahmad Rahman',
  blood_group: 'A+',
  birth_certificate_no: 'BC123456789',
  gender: 'Male',
  registration_date: '2024-01-15',
  section_name: 'Nurani',
  group_name: 'Mutawassitah',
  class_name: 'Eight',
  roll: '04',
  current_location: 'Dhaka, Bangladesh',
  permanent_location: 'Chittagong, Bangladesh',
  day_care: true,
  residential: true,
  residential_category: 'Normal',

  class_fee: 5000,
  residential_fee: 3000,
  webinars_amount: 2000,
  total: 10000,

  guardian_name: 'Abdul Rahman',
  guardian_relation: 'Father',
  phone_number: '01712-345678',
  alternative_phone_number: '01712-987654',
  guardian_current_location: 'Dhaka, Bangladesh',
  guardian_permanent_location: 'Chittagong, Bangladesh',
};

export default function StudentDetailsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StudentDetailsFormData>({
    defaultValues: mockStudentData,
  });

  const watchedValues = watch();

  const onSubmit = async (data: StudentDetailsFormData) => {
    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Student data saved:', data);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = handleSubmit(onSubmit);

  const handleResidentialCategoryChange = (categoryName: string) => {
    setValue('residential_category', categoryName);
    const selectedCategory = residentialCategories.find((cat) => cat.name === categoryName);
    if (selectedCategory) {
      setValue('residential_fee', selectedCategory.fee);
    }
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
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleCancel = () => {
    reset();
    setImagePreview(null);
    setIsEditing(false);
  };

  // Calculate total fee
  const totalFee =
    (watchedValues.class_fee || 0) +
    (watchedValues.residential ? watchedValues.residential_fee || 0 : 0) -
    (watchedValues.webinars_amount || 0);

  return (
    <div className="container mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar className="h-30 w-30 cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage
                src={imagePreview || watchedValues.profile_image}
                alt={watchedValues.full_name}
              />
              <AvatarFallback className="text-md">
                {watchedValues.full_name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleAvatarClick}
              >
                <Camera className="h-8 w-8 text-white" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{watchedValues.full_name}</h1>
            <p className="text-muted-foreground">
              {watchedValues.class_name} - {watchedValues.section_name} | Roll: {watchedValues.roll}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving Student...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} className="gap-0">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* General Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>Basic student information and academic details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-md" htmlFor="branch">
                Branch
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.branch}
                  onValueChange={(value) => setValue('branch', value)}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Boys">Boys</SelectItem>
                    <SelectItem value="Girls">Girls</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">{watchedValues.branch}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="full_name">
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('full_name', { required: 'Full name is required' })}
                  placeholder="Enter full name"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">{watchedValues.full_name}</div>
              )}
              {errors.full_name && (
                <p className="text-sm text-destructive">{errors.full_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="blood_group">
                Blood Group
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.blood_group}
                  onValueChange={(value) => setValue('blood_group', value)}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.blood_group}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="birth_certificate_no">
                Birth Certificate No
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('birth_certificate_no')}
                  placeholder="Enter birth certificate number"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.birth_certificate_no}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="gender">
                Gender
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.gender}
                  onValueChange={(value) => setValue('gender', value)}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">{watchedValues.gender}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="registration_date">
                Registration Date
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  type="date"
                  {...register('registration_date')}
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {formatDate(watchedValues.registration_date)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="section_name">
                Section
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.section_name}
                  onValueChange={(value) => setValue('section_name', value)}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nurani">Nurani</SelectItem>
                    <SelectItem value="Kitab">Kitab</SelectItem>
                    <SelectItem value="Najera">Najera</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.section_name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="group_name">
                Group
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.group_name}
                  onValueChange={(value) => setValue('group_name', value)}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ibtida'iyyah">Ibtida&apos;iyyah</SelectItem>
                    <SelectItem value="Thanawiyyah 'Ulyā">Thanawiyyah &apos;Ulyā</SelectItem>
                    <SelectItem value="Ālimiyyah">Ālimiyyah</SelectItem>
                    <SelectItem value="Mutawassitah">Mutawassitah</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">{watchedValues.group_name}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="class_name">
                Class
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.class_name}
                  onValueChange={(value) => setValue('class_name', value)}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shishu">Shishu</SelectItem>
                    <SelectItem value="One">One</SelectItem>
                    <SelectItem value="Two">Two</SelectItem>
                    <SelectItem value="Three">Three</SelectItem>
                    <SelectItem value="Four">Four</SelectItem>
                    <SelectItem value="Five">Five</SelectItem>
                    <SelectItem value="Six">Six</SelectItem>
                    <SelectItem value="Seven">Seven</SelectItem>
                    <SelectItem value="Eight">Eight</SelectItem>
                    <SelectItem value="Nine">Nine</SelectItem>
                    <SelectItem value="Ten">Ten</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">{watchedValues.class_name}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="roll">
                Roll
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('roll')}
                  placeholder="Enter roll number"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">{watchedValues.roll}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="current_location">
                Current Location
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('current_location')}
                  placeholder="Enter current location"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.current_location}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="permanent_location">
                Permanent Location
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('permanent_location')}
                  placeholder="Enter permanent location"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.permanent_location}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="day_care">
                Day Care
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.day_care ? 'Yes' : 'No'}
                  onValueChange={(value) => setValue('day_care', value === 'Yes')}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select day care" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.day_care ? 'Yes' : 'No'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="residential">
                Residential
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.residential ? 'Yes' : 'No'}
                  onValueChange={(value) => setValue('residential', value === 'Yes')}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select residential" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.residential ? 'Yes' : 'No'}
                </div>
              )}
            </div>

            {watchedValues.residential && (
              <div className="space-y-2">
                <Label className="text-md" htmlFor="residential_category">
                  Residential Category
                </Label>
                {isEditing ? (
                  <Select
                    value={watchedValues.residential_category}
                    onValueChange={handleResidentialCategoryChange}
                  >
                    <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                      <SelectValue placeholder="Select residential category" />
                    </SelectTrigger>
                    <SelectContent>
                      {residentialCategories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name} (৳{category.fee.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 text-sm bg-muted/40 rounded-md">
                    {watchedValues.residential_category}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fee Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Information</CardTitle>
          <CardDescription>Student fee details and payment information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-md" htmlFor="class_fee">
                Class Fee
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  type="number"
                  {...register('class_fee', { valueAsNumber: true })}
                  placeholder="Enter class fee"
                />
              ) : (
                <div className="p-2 text-md bg-muted/40 rounded-md">
                  ৳{watchedValues.class_fee?.toLocaleString()}
                </div>
              )}
            </div>

            {watchedValues.residential && (
              <div className="space-y-2">
                <Label className="text-md" htmlFor="residential_fee">
                  Residential Fee
                </Label>
                {isEditing ? (
                  <Input
                    className="bg-muted/40 dark:bg-input/40"
                    type="number"
                    {...register('residential_fee', { valueAsNumber: true })}
                    placeholder="Enter residential fee"
                  />
                ) : (
                  <div className="p-2 text-md bg-muted/40 rounded-md">
                    ৳{watchedValues.residential_fee?.toLocaleString()}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-md" htmlFor="webinars_amount">
                Webinars Amount
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  type="number"
                  {...register('webinars_amount', { valueAsNumber: true })}
                  placeholder="Enter webinars amount"
                />
              ) : (
                <div className="p-2 text-md bg-muted/40 rounded-md">
                  ৳{watchedValues.webinars_amount?.toLocaleString()}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="total">
                Total
              </Label>
              <div className="p-2 text-md bg-primary/10 font-semibold rounded-md">
                ৳{totalFee.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardian Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
          <CardDescription>Guardian details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-md" htmlFor="guardian_name">
                Guardian Name
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('guardian_name', { required: 'Guardian name is required' })}
                  placeholder="Enter guardian name"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.guardian_name}
                </div>
              )}
              {errors.guardian_name && (
                <p className="text-sm text-destructive">{errors.guardian_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="guardian_relation">
                Relation
              </Label>
              {isEditing ? (
                <Select
                  value={watchedValues.guardian_relation}
                  onValueChange={(value) => setValue('guardian_relation', value)}
                >
                  <SelectTrigger className="bg-muted/40 dark:bg-input/40">
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Sister">Sister</SelectItem>
                    <SelectItem value="Uncle">Uncle</SelectItem>
                    <SelectItem value="Aunt">Aunt</SelectItem>
                    <SelectItem value="Grandfather">Grandfather</SelectItem>
                    <SelectItem value="Grandmother">Grandmother</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.guardian_relation}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="phone_number">
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('phone_number', { required: 'Phone number is required' })}
                  placeholder="Enter phone number"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.phone_number}
                </div>
              )}
              {errors.phone_number && (
                <p className="text-sm text-destructive">{errors.phone_number.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="alternative_phone_number">
                Alternative Phone
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('alternative_phone_number')}
                  placeholder="Enter alternative phone number"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.alternative_phone_number || 'N/A'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="guardian_current_location">
                Current Location
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('guardian_current_location')}
                  placeholder="Enter current location"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.guardian_current_location}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-md" htmlFor="guardian_permanent_location">
                Permanent Location
              </Label>
              {isEditing ? (
                <Input
                  className="bg-muted/40 dark:bg-input/40"
                  {...register('guardian_permanent_location')}
                  placeholder="Enter permanent location"
                />
              ) : (
                <div className="p-2 text-sm bg-muted/40 rounded-md">
                  {watchedValues.guardian_permanent_location}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
