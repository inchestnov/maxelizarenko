import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

// Placeholder for future API integration — swap the body for a fetch() call
// to a real booking endpoint once the backend is available.
async function submitBooking(_data) {
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 400));
}

export default function BookingForm() {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    setStatus('submitting');
    await submitBooking(formData);
    setStatus('success');
    setFormData({ name: '', phone: '' });
  };

  return (
    <section className="section section--alt" id="booking">
      <div className="container booking__inner">
        <div className="booking__info">
          <span className="section-eyebrow">Запись</span>
          <h2 className="section-title" style={{ textAlign: 'left' }}>
            Записаться на стрижку
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            Оставьте имя и телефон — я свяжусь с вами, чтобы подтвердить
            удобное время визита.
          </p>
        </div>

        <form
          ref={ref}
          className={`form reveal${isVisible ? ' is-visible' : ''}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form__row">
            <label className="form__label" htmlFor="name">Имя</label>
            <input
              id="name"
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
            <label className="form__label" htmlFor="phone">Номер телефона</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form__input"
              placeholder="+7 (___) ___-__-__"
              autoComplete="tel"
              inputMode="tel"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn--gold form__submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Отправка...' : 'Записаться'}
          </button>

          {status === 'success' && (
            <p className="form__success" role="status" aria-live="polite">
              ✓ Заявка отправлена! Я свяжусь с вами в ближайшее время.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
