/**
 * Input Validation Utilities
 * Simple validation without external dependencies
 */

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (US format)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
}

// Sanitize string input (prevent XSS)
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Validate booking/lead form
export function validateBookingForm(data: {
  name?: string;
  email?: string;
  phone?: string;
  venueName?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  if (!data.venueName || data.venueName.trim().length < 2) {
    errors.venueName = 'Venue name is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Validate client creation
export function validateClientData(data: {
  name?: string;
  email?: string;
  tier?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  const validTiers = ['pilot', 't1', 't2', 'vip'];

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.tier || !validTiers.includes(data.tier)) {
    errors.tier = `Tier must be one of: ${validTiers.join(', ')}`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Validate shoot scheduling
export function validateShootData(data: {
  clientId?: string;
  type?: string;
  scheduledDate?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  const validTypes = ['pilot', 'standard', 'premium', 'vip'];

  if (!data.clientId) {
    errors.clientId = 'Client ID is required';
  }

  if (!data.type || !validTypes.includes(data.type)) {
    errors.type = `Type must be one of: ${validTypes.join(', ')}`;
  }

  if (!data.scheduledDate) {
    errors.scheduledDate = 'Scheduled date is required';
  } else {
    const date = new Date(data.scheduledDate);
    if (isNaN(date.getTime())) {
      errors.scheduledDate = 'Invalid date format';
    } else if (date < new Date()) {
      errors.scheduledDate = 'Cannot schedule in the past';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
