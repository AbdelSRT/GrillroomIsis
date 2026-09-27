// Veilige client-side API mock helpers zonder nep-productie claims

export const submitContactForm = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.message) {
        reject(new Error("Vul alle verplichte velden in."));
      } else {
        resolve({ success: true, message: "Uw bericht is succesvol ontvangen!" });
      }
    }, 800);
  });
};

export const submitAppointmentForm = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!formData.name || !formData.phone || !formData.date || !formData.time) {
        reject(new Error("Vul alle verplichte velden in voor de afspraak."));
      } else {
        resolve({ success: true, message: "Uw afstraakaanvraag is succesvol ingediend!" });
      }
    }, 800);
  });
};

export const submitQuoteForm = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.description) {
        reject(new Error("Vul a.u.b. alle benodigde gegevens in voor een geldige offerte-aanvraag."));
      } else {
        resolve({ success: true, message: "Bedankt! We sturen u zo snel mogelijk een passende offerte." });
      }
    }, 800);
  });
};
