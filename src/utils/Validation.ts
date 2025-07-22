// Validation utility functions

// /**
//  * Validates email format
//  * @param email - Email string to validate
//  * @returns boolean - true if valid, false otherwise
//  */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // | `^`=>Start of the string                                                              |
  // | `[a-zA-Z0-9._%+-]+`=>One or more letters, digits, or allowed special characters before the `@` symbol
  // | `@`=> `@` symbol
  // | `[a-zA-Z0-9.-]+` =>ily ykoun ba3il @ mthl (gmail, outlook, etc.)
  // | `\.` => il dot ily n76ha gabil ilDomain extention mthl .com
  // | `[a-zA-Z]{2,}`=> Domain extension (e.g., com, net, org) with at least 2 characters
  // | `$`=> End of the string

  return emailRegex.test(email);
};

// /**
//  * Validates phone number format
//  * Supports international and local formats
//  * @param phone - Phone string to validate
//  * @returns boolean - true if valid, false otherwise
//  */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+?[0-9]{1,4}[\s-]?)?[0-9]{8,15}$/;
  // \+?=>	Optional + y3ni ya a76 fat7 ilkha6 directly aw i use +(+965)
  // [0-9]{1,4}=> ina fat7 ilkha6 ykoon mn	1 to 4 digits (common length of country codes)
  // [\s-]?	=> hatha Optional space or dash ily ba3ad fat7 ilkha6 ( +965 12345678 or +965-12345678)
  //la2ana il Whole group ily bain il (...) followed by ?	y3ni The entire country code part is optional
  // [0-9]{8,15}=>il7een il ra8am ily ba3ad fat7 ilkha6 Must be between 8 to 15 digits
  // No letters, no other characters
  // No spaces/dashes allowed inside the main number (unless you modify the regex)

  return phoneRegex.test(phone);
};

// /**
// //  * Validates Civil ID format (12 digits)
// //  * @param civilID - Civil ID string to validate
// //  * @returns boolean - true if valid, false otherwise
// //  */
export const isValidCivilID = (civilID: string): boolean => {
  const civilIDRegex = /^[0-9]{12}$/;
  // | `[0-9]`il ar8am  Match any digit from `0` to `9`
  // | `{12}`   Match **exactly 12** digits   LAZM 12 DIGITS MU A8AL WALA AKTHAR

  return civilIDRegex.test(civilID);
};

// /**
//  * Validates all required fields are present
//  * @param data - Object containing user data
//  * @returns { isValid: boolean, missingFields: string[] }
//  */
export const validateRequiredFields = (
  data: any
): { isValid: boolean; missingFields: string[] } => {
  const requiredFields = ["name", "civilID", "password"];
  const missingFields: string[] = [];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      missingFields.push(field);
    }
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};
