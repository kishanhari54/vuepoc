// Required field validation
export const required = (value: unknown): string | boolean => {
  return !!value || "This field is required";
};

// Minimum length validation
export const minLength =
  (min: number) =>
  (value: string): string | boolean => {
    return value.length >= min || `Minimum length is ${min} characters`;
  };

// Maximum length validation
export const maxLength =
  (max: number) =>
  (value: string): string | boolean => {
    return value.length <= max || `Maximum length is ${max} characters`;
  };

// Email validation
export const email = (value: string): string | boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,}$/;
  return regex.test(value) || "Please enter a valid email address";
};

// Custom validation for numbers (greater than a certain number)
export const greaterThan =
  (minValue: number) =>
  (value: string): string | boolean => {
    return (
      Number(value) >= minValue ||
      `Value should be greater than or equal to ${minValue}`
    );
  };

// Custom validation for maximum number
export const lessThan =
  (maxValue: number) =>
  (value: string): string | boolean => {
    return (
      Number(value) <= maxValue ||
      `Value should be less than or equal to ${maxValue}`
    );
  };
