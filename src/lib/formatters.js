export const formatCurrency = (amount, currency = "EUR", locale = "nl-BE") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(amount);
};

export const formatDate = (dateString, locale = "nl-BE") => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
};
