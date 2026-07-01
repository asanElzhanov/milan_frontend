export type UserRole = 'customer' | 'manager' | 'admin' | string;

export type User = {
  id: string | number;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
  role?: UserRole | null;
  isActive?: boolean;
  isStaff?: boolean;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  dateJoined?: string | null;
};
