'use client';

import { type LoginInput, loginSchema } from '@/domain/auth/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, Lock, Phone } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import MadrashaLogo from '~/public/images/habrul ummah model madrasa logo.svg';

import type React from 'react';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone_number: '', password: '' },
    mode: 'onSubmit',
  });

  const handleLogin = async (data: LoginInput) => {
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      phone_number: data.phone_number,
      password: data.password,
    });
    if (result?.ok) {
      router.push('/dashboard/overview');
      return;
    }
    setError('Invalid phone number or password.');
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card">
      <CardHeader className="space-y-1 text-center pb-8">
        <div className="flex justify-center mb-6">
          <Image
            src={MadrashaLogo}
            alt="Madrasha Logo"
            width={200}
            height={80}
            className="h-20 w-auto max-w-[200px] object-contain"
            priority
          />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">Login</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...register('phone_number')}
                className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isSubmitting}
              />
              {errors.phone_number && (
                <p className="mt-1 text-xs text-destructive">{errors.phone_number.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className="pl-10 pr-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-colors dark:text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 text-sm"
              disabled={isSubmitting}
            >
              Forgot your password?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
