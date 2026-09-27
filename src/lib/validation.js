export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPhone = (phone) => {
  const re = /^[\d\s\+\-\(\)]{8,20}$/;
  return re.test(String(phone));
};

export const validateContactForm = (data) => {
  const errors = {};
  if (!data.name || data.name.trim() === '') {
    errors.name = "Naam is verplicht.";
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Voer een geldig e-mailadres in.";
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Bericht moet minimaal 10 tekens bevatten.";
  }
  return errors;
};
