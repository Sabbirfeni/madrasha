import { AdminRole } from '@/domain/admins/enums';

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: 'Super Admin',
  [AdminRole.ADMIN]: 'Admin',
};
