'use client';

import { User } from 'lucide-react';

import type React from 'react';
import { useState } from 'react';

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

// Mock employee data for the dropdown
const employees = [
  { id: '1', name: 'John Smith', avatar: '/professional-man.png' },
  { id: '2', name: 'Sarah Johnson', avatar: '/professional-woman-diverse.png' },
  { id: '3', name: 'Michael Brown', avatar: '/professional-man-glasses.png' },
  { id: '4', name: 'Emily Davis', avatar: '/professional-woman-short-hair.png' },
];

export function AddAdminModal({ open, onOpenChange }: AddAdminModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [permissions, setPermissions] = useState({
    is_access_boys_section: false,
    is_access_girls_section: false,
    is_access_residential_section: false,
  });

  const selectedEmployeeData = employees.find((emp) => emp.id === selectedEmployee);

  const handlePermissionChange = (permission: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                <SelectValue placeholder="Choose an employee..." />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={employee.avatar || '/placeholder.svg'}
                          alt={employee.name}
                        />
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      {employee.name}
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
                  <AvatarImage
                    src={selectedEmployeeData.avatar || '/placeholder.svg'}
                    alt={selectedEmployeeData.name}
                  />
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
                  value={selectedEmployeeData.name}
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
                  placeholder="Enter phone number"
                  value="+880 1843 676171"
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

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Add Admin
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
