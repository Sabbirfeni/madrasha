'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type React from 'react';
import { useEffect, useState } from 'react';

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

import type { Income } from './IncomeListTable';

const incomeSchema = z.object({
  type: z.enum(['Student Fee', 'Book Sell', 'Other']),
  note: z.string(),
  date: z.string().min(1, 'Date is required'),
  amount: z
    .number({ message: 'Amount must be a number' })
    .min(0.01, 'Amount must be greater than 0')
    .refine((val) => val > 0, 'Amount cannot be 0 or empty'),
});

type IncomeFormData = z.infer<typeof incomeSchema>;

interface EditIncomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  income: Income | null;
}

export function EditIncomeModal({ open, onOpenChange, income }: EditIncomeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      type: undefined,
      note: '',
      date: '',
      amount: 0,
    },
  });

  const watchedType = watch('type');

  useEffect(() => {
    if (income) {
      setValue('type', income.type);
      setValue('note', income.note);
      setValue('date', income.date);
      setValue('amount', income.amount);
    }
  }, [income, setValue]);

  const onSubmit = async (data: IncomeFormData) => {
    if (!income) return;

    setIsSubmitting(true);
    try {
      // Here you would typically call an API to update the income
      console.log('Updating income:', { id: income.id, ...data });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Close modal
      onOpenChange(false);

      // You could add a toast notification here
      console.log('Income updated successfully!');
    } catch (error) {
      console.error('Error updating income:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  if (!income) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Income</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Income Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={watchedType}
              onValueChange={(value) =>
                setValue('type', value as 'Student Fee' | 'Book Sell' | 'Other')
              }
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select income type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Student Fee">Student Fee</SelectItem>
                <SelectItem value="Book Sell">Book Sell</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
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
              min="0.01"
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
              {isSubmitting ? 'Updating...' : 'Update Income'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
