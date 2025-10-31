'use client';

import { getTodayDate } from '@/lib/date-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
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
const expenseSchema = z.object({
  branch: z
    .string()
    .min(1, 'Please select a branch')
    .refine((val) => val && ['Boys', 'Girls'].includes(val), {
      message: 'Please select a valid branch',
    }),
  type: z
    .string()
    .min(1, 'Please select an expense type')
    .refine((val) => val && ['Salary', 'Food', 'Utility'].includes(val), {
      message: 'Please select a valid expense type',
    }),
  note: z.string().min(1, 'Note is required'),
  date: z.string().min(1, 'Date is required'),
  amount: z
    .number({ message: 'Amount must be a number' })
    .min(0.01, 'Amount must be greater than 0')
    .refine((val) => val > 0, 'Amount cannot be 0 or empty'),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      branch: '',
      type: '',
      note: '',
      date: getTodayDate(), // Today's date in YYYY-MM-DD format
      amount: 0,
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically call an API to add the expense
      console.log('Adding expense:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close modal
      reset();
      onOpenChange(false);

      // You could add a toast notification here
      console.log('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
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
          <DialogTitle className="text-xl font-semibold">Add New Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Branch and Type Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Branch */}
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.branch ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boys">Boys</SelectItem>
                      <SelectItem value="Girls">Girls</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.branch && <p className="text-sm text-red-500">{errors.branch.message}</p>}
            </div>

            {/* Expense Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select expense type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Salary">Salary</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Utility">Utility</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>
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
              min="0.01"
              step="0.01"
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
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

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <textarea
              id="note"
              placeholder="Enter note or description"
              {...register('note')}
              className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.note ? 'border-red-500' : ''
              }`}
            />
            {errors.note && <p className="text-sm text-red-500">{errors.note.message}</p>}
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
              {isSubmitting ? 'Adding...' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
