import { type DefaultSession } from 'next-auth';
import { type JWT as DefaultJWT } from 'next-auth/jwt';

type AdminProfile = {
  fullname: string;
  phone_number: string;
  role: number;
  permissions?: Record<string, boolean>;
};

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    admin?: AdminProfile;
    user?: DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    admin?: AdminProfile;
  }
}
