import useScrollReveal from '../hooks/useScrollReveal';
import { PhoneIcon, WhatsAppIcon, TelegramIcon, PinIcon } from './Icons';
import { isValidPhoneNumber, formatRuPhoneDisplay, toWhatsAppLink, toTelegramLink } from '../utils/phone';
import { PHONE_RAW, ADDRESS, YANDEX_MAPS_URL } from '../constants';

if (import.meta.env.DEV && !isValidPhoneNumber(PHONE_RAW)) {
  console.warn(`Contacts: "${PHONE_RAW}" is not a valid RU phone number (expected format +7XXXXXXXXXX).`);
}

const PHONE_DISPLAY = formatRuPhoneDisplay(PHONE_RAW);
const WHATSAPP_URL = toWhatsAppLink(PHONE_RAW);
const TELEGRAM_URL = toTelegramLink(PHONE_RAW);

export default function Contacts() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="section" id="contacts">
      <div className="container">
        <span className="section-eyebrow">Контакты</span>
        <h2 className="section-title">Свяжитесь со мной</h2>

        <div ref={ref} className={`contacts__list reveal${isVisible ? ' is-visible' : ''}`}>
          <a
            className="contact-link contact-link--wide"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-link__icon">
              <WhatsAppIcon width={22} height={22} />
            </span>
            <span className="contact-link__title">Написать в WhatsApp</span>
          </a>

          <a
            className="contact-link contact-link--wide"
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-link__icon">
              <TelegramIcon width={22} height={22} />
            </span>
            <span className="contact-link__title">Написать в Telegram</span>
          </a>

          <div className="contacts__row">
            <a className="contact-link" href={`tel:${PHONE_RAW}`}>
              <span className="contact-link__icon">
                <PhoneIcon width={22} height={22} />
              </span>
              <span>
                <span className="contact-link__title">Позвонить</span>
                <span className="contact-link__desc">{PHONE_DISPLAY}</span>
              </span>
            </a>

            <a
              className="contact-link"
              href={YANDEX_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-link__icon">
                <PinIcon width={22} height={22} />
              </span>
              <span>
                <span className="contact-link__title">Как добраться</span>
                <span className="contact-link__desc">{ADDRESS}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
