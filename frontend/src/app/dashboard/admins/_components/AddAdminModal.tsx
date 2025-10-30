'use client';

import { AdminRole } from '@/domain/admins';
import { getErrorMessage } from '@/lib/rtk-utils';
import { useCreateAdminMutation } from '@/services/rtk/adminsApi';
import { useLazyGetEmployeesQuery } from '@/services/rtk/employeesApi';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { User } from 'lucide-react';
import { toast } from 'sonner';

import type React from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Fetch real employees via RTK Query

export function AddAdminModal({ open, onOpenChange }: AddAdminModalProps) {
  const router = useRouter();

  const [
    triggerEmployees,
    { data: employees = [], isFetching: isEmployeesLoading, isError: isEmployeesError },
  ] = useLazyGetEmployeesQuery();
  useEffect(() => {
    if (open) {
      triggerEmployees({}, true);
    }
  }, [open, triggerEmployees]);
  const [createAdmin, { isLoading: isCreating, error: createError }] = useCreateAdminMutation();
  console.log('createError', createError);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [permissions, setPermissions] = useState({
    is_access_boys_section: false,
    is_access_girls_section: false,
    is_access_residential_section: false,
  });

  const selectedEmployeeData = employees.find((emp) => emp._id === selectedEmployee);

  const handlePermissionChange = (permission: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    try {
      await createAdmin({
        employee_id: selectedEmployee,
        role: AdminRole.ADMIN,
        access_boys_section: permissions.is_access_boys_section,
        access_girls_section: permissions.is_access_girls_section,
        access_residential_section: permissions.is_access_residential_section,
      }).unwrap();

      toast.success('Admin created successfully');

      onOpenChange(false);
      setSelectedEmployee('');
      setPermissions({
        is_access_boys_section: false,
        is_access_girls_section: false,
        is_access_residential_section: false,
      });
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err as FetchBaseQueryError | SerializedError | undefined));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="employee">Select Employee</Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue
                  placeholder={isEmployeesLoading ? 'Loading...' : 'Choose an employee...'}
                />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee._id} value={employee._id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={'/placeholder.svg'} alt={employee.fullname} />
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{employee.fullname}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Employee Details - Show only when employee is selected */}
          {selectedEmployee && selectedEmployeeData && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
              {/* Employee Profile Picture */}
              <div className="flex justify-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={'/placeholder.svg'} alt={selectedEmployeeData.fullname} />
                  <AvatarFallback className="text-lg">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Employee Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  value={selectedEmployeeData.fullname}
                  readOnly
                  className="bg-background"
                  disabled
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={selectedEmployeeData.phone_number ?? ''}
                  type="tel"
                  disabled
                />
              </div>

              {/* Access Permissions */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Access Permissions</Label>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="boys-section"
                      checked={permissions.is_access_boys_section}
                      onCheckedChange={() => handlePermissionChange('is_access_boys_section')}
                    />
                    <Label htmlFor="boys-section" className="text-sm font-normal cursor-pointer">
                      Boys Section
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="girls-section"
                      checked={permissions.is_access_girls_section}
                      onCheckedChange={() => handlePermissionChange('is_access_girls_section')}
                    />
                    <Label htmlFor="girls-section" className="text-sm font-normal cursor-pointer">
                      Girls Section
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="residential-section"
                      checked={permissions.is_access_residential_section}
                      onCheckedChange={() =>
                        handlePermissionChange('is_access_residential_section')
                      }
                    />
                    <Label
                      htmlFor="residential-section"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Residential Section
                    </Label>
                  </div>
                </div>
              </div>

              {/* Error + Submit */}
              {isEmployeesError && (
                <p className="text-sm text-destructive">Failed to load employees.</p>
              )}
              {createError && (
                <p className="text-sm text-destructive">{getErrorMessage(createError)}</p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={isCreating || isEmployeesLoading || !selectedEmployee}
              >
                {isCreating ? 'Adding...' : 'Add Admin'}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
