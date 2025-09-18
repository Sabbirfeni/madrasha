'use client';

import { Eye, EyeOff, Lock, Phone } from 'lucide-react';
import MadrashaLogo from '~/public/images/habrul ummah model madrasa logo.svg';

import type React from 'react';
import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <Card className="bg-card mx-auto w-full max-w-md border-0 shadow-lg">
      <CardHeader className="space-y-1 pb-8 text-center">
        <div className="mb-2 flex justify-center">
          {/* Company Logo Placeholder */}
          <Image
            src={MadrashaLogo}
            alt="Madrasha Logo"
            width={200}
            height={80}
            className="h-20 w-auto max-w-[200px] object-contain"
            priority
          />
        </div>
        <CardTitle className="text-foreground text-2xl font-bold">Login</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground text-sm font-semibold">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-input border-border focus:ring-ring h-12 pl-10 focus:border-transparent focus:ring-2"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground text-sm font-semibold">
              Password
            </Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border focus:ring-ring h-12 pr-10 pl-10 focus:border-transparent focus:ring-2"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full cursor-pointer text-base font-semibold transition-colors dark:text-white"
          >
            Login
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 text-sm"
            >
              Forgot your password?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
