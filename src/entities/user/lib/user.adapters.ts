import type { User } from '../model/user.types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readString = (value: unknown): string | null => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return null;
};

const readBoolean = (value: unknown): boolean | undefined =>
  typeof value === 'boolean' ? value : undefined;

const unwrapUser = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (isRecord(raw.user)) {
    return raw.user;
  }

  if (isRecord(raw.data)) {
    if (isRecord(raw.data.user)) {
      return raw.data.user;
    }

    return raw.data;
  }

  return raw;
};

export function adaptUser(raw: unknown): User | null {
  const record = unwrapUser(raw);

  if (!isRecord(record)) {
    return null;
  }

  const id = readString(record.id) ?? readString(record.pk);

  if (!id) {
    return null;
  }

  return {
    id,
    email: readString(record.email),
    phone: readString(record.phone),
    firstName: readString(record.first_name),
    lastName: readString(record.last_name),
    fullName: readString(record.full_name),
    avatarUrl: readString(record.avatar_url) ?? readString(record.avatar),
    role: readString(record.role),
    isActive: readBoolean(record.is_active),
    isStaff: readBoolean(record.is_staff),
    isEmailVerified: readBoolean(record.is_email_verified),
    isPhoneVerified: readBoolean(record.is_phone_verified),
  };
}
