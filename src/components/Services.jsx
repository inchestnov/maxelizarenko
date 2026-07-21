import useScrollReveal from '../hooks/useScrollReveal';

const SERVICES = [
  { name: 'Стрижка', price: 2300, popular: true },
  { name: 'Стрижка + Борода', price: 3220, popular: true },
  { name: 'Стрижка Машинкой', price: 1725 },
  { name: 'Стрижка Машинкой / Одна Длина', price: 805 },
  { name: 'Стрижка Бороды', price: 1380 },
  { name: 'Сбрить Бороду Машинкой', price: 575 },
  { name: 'Камуфляж Седины', price: 1495 },
  { name: 'Детская Стрижка / До 14 Лет', price: 1725 },
  { name: 'Детская Стрижка / До 7 Лет', price: 1380 },
];

function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export default function Services() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <span className="section-eyebrow">Прайс-лист</span>
        <h2 className="section-title">Услуги и цены</h2>

        <div ref={ref} className={`services__grid reveal${isVisible ? ' is-visible' : ''}`}>
          {SERVICES.map((service) => (
            <div
              className={`service-card${service.popular ? ' service-card--popular' : ''}`}
              key={service.name}
            >
              {service.popular && <span className="service-card__badge">Популярно</span>}
              <span className="service-card__name">{service.name}</span>
              <span className="service-card__price">{formatPrice(service.price)}</span>
            </div>
          ))}
        </div>

        <p className="services__note">
          <span aria-hidden="true">🐕</span> Можно с собаками — заходите вместе с четвероногим другом.
        </p>
      </div>
    </section>
  );
}
