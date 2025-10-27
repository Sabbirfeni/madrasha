'use client';

import type React from 'react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Admin } from './AdminListTable';

interface EditAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: Admin | null;
}

export function EditAdminModal({ open, onOpenChange, admin }: EditAdminModalProps) {
  const [permissions, setPermissions] = useState({
    is_access_boys_section: false,
    is_access_girls_section: false,
    is_access_residential_section: false,
  });

  const handlePermissionChange = (permission: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!admin) return null;

  const initials = admin.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
            {/* Employee Profile Picture */}
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={admin.avatar || '/placeholder.svg'} alt={admin.name} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
            </div>

            {/* Employee Full Name - Disabled */}
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                value={admin.name}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            {/* Phone Number - Disabled */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={admin.phone}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
                type="tel"
              />
            </div>

            {/* Access Permissions - Enabled */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Access Permissions</Label>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="boys-section"
                    checked={permissions.is_access_boys_section}
                    onCheckedChange={() => handlePermissionChange('is_access_boys_section')}
                  />
                  <Label htmlFor="boys-section" className="text-sm font-normal">
                    Boys Section
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="girls-section"
                    checked={permissions.is_access_girls_section}
                    onCheckedChange={() => handlePermissionChange('is_access_girls_section')}
                  />
                  <Label htmlFor="girls-section" className="text-sm font-normal">
                    Girls Section
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="residential-section"
                    checked={permissions.is_access_residential_section}
                    onCheckedChange={() => handlePermissionChange('is_access_residential_section')}
                  />
                  <Label htmlFor="residential-section" className="text-sm font-normal">
                    Residential Section
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Update Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
