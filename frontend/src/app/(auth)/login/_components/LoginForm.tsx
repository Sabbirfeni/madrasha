'use client';

import { AlertCircle, Eye, EyeOff, Lock, Phone } from 'lucide-react';
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
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (phoneNumber === '+880 1843 676171' && password === '123') {
      document.cookie = `auth=true`;
      router.push('/dashboard');
    } else {
      setError('Invalid phone number or password. Please try again.');
    }

    setIsLoading(false);
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
        <form onSubmit={handleLogin} className="space-y-6">
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                required
                disabled={isLoading}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-colors dark:text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 text-sm"
              disabled={isLoading}
            >
              Forgot your password?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
