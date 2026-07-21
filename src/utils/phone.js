const RU_PHONE_REGEX = /^7(\d{3})(\d{3})(\d{2})(\d{2})$/;

export function isValidPhoneNumber(phone) {
  return RU_PHONE_REGEX.test(phone.replace(/\D/g, ''));
}

export function formatRuPhoneDisplay(phone) {
  const match = phone.replace(/\D/g, '').match(RU_PHONE_REGEX);
  if (!match) return phone;
  const [, area, first, second, third] = match;
  return `+7 (${area}) ${first}-${second}-${third}`;
}

export function toWhatsAppLink(phone) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`;
}

export function toTelegramLink(phone) {
  return `https://t.me/+${phone.replace(/\D/g, '')}`;
}
