// validations/signupValidation.js
export const validateSignup = (values) => {
  const errors = {};

// ✅ Full name (at least 2 words, only letters & spaces)
if (!values.fullName.trim()) {
  errors.fullName = "Full Name is required";
} else if (!/^[A-Za-z]+(?: [A-Za-z]+)+$/.test(values.fullName)) {
  errors.fullName = "Enter a valid full name (first & last)";
}

// ✅ Email
if (!values.email.trim()) {
  errors.email = "Email is required";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
  errors.email = "Invalid email format";
}

// ✅ Phone (10 digits, India example)
if (!values.phone.trim()) {
  errors.phone = "Phone number is required";
} else if (!/^[6-9]\d{9}$/.test(values.phone)) {
  errors.phone = "Enter a valid 10-digit phone number";
}

// ✅ Gender
if (!values.gender) {
  errors.gender = "Gender is required";
}

// ✅ Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
if (!values.password) {
  errors.password = "Password is required";
} else if (
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    values.password
  )
) {
  errors.password =
    "Password must be at least 8 chars & include uppercase, lowercase, number & special char";
}

// ✅ Confirm Password
if (values.confirmPassword !== values.password) {
  errors.confirmPassword = "Passwords do not match";
}

return errors;

};
