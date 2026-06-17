import type { AppLocale } from '@/shared/config';

export type OtpDictionary = {
  otpTitle: string;
  otpSubtitle: string;
  otpCode: string;
  verifyCode: string;
  resendCode: string;
  changeContact: string;
  otpComingSoon: string;
  invalidOtp: string;
  requiredField: string;
};

export type OtpFormProps = {
  locale: AppLocale;
  dictionary: OtpDictionary;
};
