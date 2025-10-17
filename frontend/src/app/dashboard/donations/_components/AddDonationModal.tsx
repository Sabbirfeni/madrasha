'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
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

// Zod validation schema
const donationSchema = z.object({
  donorName: z.string().min(1, 'Donor name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  type: z
    .string()
    .min(1, 'Please select a donation type')
    .refine((val) => ['Membership', 'Sadka', 'Jakat'].includes(val), {
      message: 'Please select a valid donation type',
    }),
  date: z.string().min(1, 'Date is required'),
  amount: z
    .number()
    .min(1, 'Amount must be greater than 0')
    .refine((val) => val > 0, 'Amount cannot be 0 or empty'),
});

type DonationFormData = z.infer<typeof donationSchema>;

interface AddDonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDonationModal({ open, onOpenChange }: AddDonationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorName: '',
      phoneNumber: '',
      type: '',
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      amount: 0,
    },
  });

  const watchedType = watch('type');

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically call an API to add the donation
      console.log('Adding donation:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close modal
      reset();
      onOpenChange(false);

      // You could add a toast notification here
      console.log('Donation added successfully!');
    } catch (error) {
      console.error('Error adding donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Donation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Donor Name */}
          <div className="space-y-2">
            <Label htmlFor="donorName">Donor Name</Label>
            <Input
              id="donorName"
              placeholder="Enter donor name"
              {...register('donorName')}
              className={errors.donorName ? 'border-red-500' : ''}
            />
            {errors.donorName && <p className="text-sm text-red-500">{errors.donorName.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Enter phone number"
              {...register('phoneNumber')}
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Donation Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Donation Type</Label>
            <Select
              value={watchedType}
              onValueChange={(value) => {
                setValue('type', value as 'Membership' | 'Sadka' | 'Jakat');
                trigger('type'); // Trigger validation to clear error message
              }}
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select donation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Membership">Membership</SelectItem>
                <SelectItem value="Sadka">Sadka</SelectItem>
                <SelectItem value="Jakat">Jakat</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register('date')}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              {...register('amount', { valueAsNumber: true })}
              className={errors.amount ? 'border-red-500' : ''}
              min="1"
              step="0.01"
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Donation'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
