'use client';

import { AlertTriangle } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Admin } from './AdminListTable';

interface DeleteAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: Admin | null;
  onConfirm?: (admin: Admin) => void;
}

export function DeleteAdminModal({ open, onOpenChange, admin, onConfirm }: DeleteAdminModalProps) {
  if (!admin) return null;

  const initials = admin.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleConfirm = () => {
    onConfirm?.(admin);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle>Delete Admin</AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                Are you sure you want to remove this admin? This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={admin.avatar || '/placeholder.svg'} alt={admin.name} />
            <AvatarFallback className="text-sm font-medium">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{admin.name}</div>
            <div className="text-sm text-muted-foreground">{admin.type}</div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Delete Admin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
