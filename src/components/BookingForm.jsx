import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { CalendarIcon } from './Icons';
import { YANDEX_BOOKING_URL } from '../constants';

// Placeholder for future API integration — swap the body for a fetch() call
// to a real callback endpoint once the backend is available.
async function submitCallbackRequest(_data) {
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 400));
}

const RU_PHONE_PATTERN = '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}';

// Masks input as +7 (999) 999-99-99 while typing, accepting either a
// leading 7 or 8 (both common in Russia) and stripping everything else.
function formatPhoneInput(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('7') || digits.startsWith('8')) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (!digits) return '';

  let result = `+7 (${digits.slice(0, 3)}`;
  if (digits.length >= 3) result += ')';
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`;

  return result;
}

export default function BookingForm() {
  const [ref, isVisible] = useScrollReveal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => setIsModalOpen(false), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const openModal = () => {
    setStatus('idle');
    setFormData({ name: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: formatPhoneInput(value) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    setStatus('submitting');
    await submitCallbackRequest(formData);
    setStatus('success');
  };

  return (
    <section className="section section--accent" id="booking">
      <div className="container">
        <span className="section-eyebrow">Запись</span>
        <h2 className="section-title">Запланируйте свой визит</h2>

        <div ref={ref} className={`booking__options reveal${isVisible ? ' is-visible' : ''}`}>
          <div className="booking__option">
            <a
              href={YANDEX_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold"
            >
              <CalendarIcon width={20} height={20} />
              Записаться через Яндекс Карты
            </a>
          </div>

          <div className="booking__option">
            <h3 className="booking__question">Остались вопросы?</h3>
            <p className="booking__option-text">
              Оставьте контакты — я свяжусь с вами.
            </p>
            <button type="button" className="btn btn--ghost" onClick={openModal}>
              Оставить контакты
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)} />
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Оставить контакты"
          >
            <button
              type="button"
              className="modal__close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>

            {status === 'success' ? (
              <p className="form__success" role="status" aria-live="polite">
                ✓ Заявка отправлена! Я свяжусь с вами в ближайшее время.
              </p>
            ) : (
              <form className="modal__form" onSubmit={handleSubmit} noValidate>
                <div className="form__row">
                  <label className="form__label" htmlFor="callback-name">Имя</label>
                  <input
                    id="callback-name"
                    name="name"
                    type="text"
                    className="form__input"
                    placeholder="Как к вам обращаться"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form__row">
                  <label className="form__label" htmlFor="callback-phone">Номер телефона</label>
                  <input
                    id="callback-phone"
                    name="phone"
                    type="tel"
                    className="form__input"
                    placeholder="+7 (___) ___-__-__"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    pattern={RU_PHONE_PATTERN}
                    title="Введите номер в формате +7 (999) 999-99-99"
                    maxLength={18}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn--gold modal__submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Сохраняем контакты...' : 'Оставить контакты'}
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </section>
  );
}
