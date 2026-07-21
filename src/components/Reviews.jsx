import useScrollReveal from '../hooks/useScrollReveal';

const REVIEWS = [
  {
    name: 'Александр',
    rating: 5,
    date: '6 октября 2025',
    text: 'Хожу к Максиму уже несколько лет. До этого стригли то слишком коротко, то криво — Максим с первого раза понял, что нужно, и подстриг идеально. Теперь только к нему: всегда индивидуальный подход, вежливо, профессионально и по делу. 5 баллов.',
  },
  {
    name: 'Никита',
    rating: 5,
    date: '13 октября 2025',
    text: 'Макс классный мастер! Интересный собеседник, делает всё чётко, работает в своей авторской методике, без шаблонов. Очень доволен стрижкой и атмосферой 🔥 Спасибо, Макс, ещё приду обязательно 🤝',
  },
  {
    name: 'Игорь',
    rating: 5,
    date: '30 октября 2025',
    text: 'Хожу к Максу уже давно — всегда отличный результат! Стрижка аккуратная, всё чётко и со вкусом. Барбер с золотыми руками, внимательный к деталям и к пожеланиям. К тому же приятный собеседник — с ним легко общаться, время за стрижкой проходит незаметно. Атмосфера всегда классная, уходишь с хорошим настроением!',
  },
];

export default function Reviews() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="section section--alt" id="reviews">
      <div className="container">
        <span className="section-eyebrow">Отзывы</span>
        <h2 className="section-title">Что говорят клиенты</h2>

        <div ref={ref} className={`reviews__list reveal${isVisible ? ' is-visible' : ''}`}>
          {REVIEWS.map((review, index) => (
            <article className="review-card" key={`${review.name}-${index}`}>
              <p className="review-card__rating">{'★'.repeat(review.rating)}</p>
              <p className="review-card__text">{review.text}</p>
              <p className="review-card__name">{review.name}</p>
              {review.date && <p className="review-card__date">{review.date}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
