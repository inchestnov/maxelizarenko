import useScrollReveal from '../hooks/useScrollReveal';
import masterPhoto from '../assets/images/avatar.webp';

const TRAITS = [
  {
    icon: '✂️',
    title: 'Профессионализм',
    text: '22 года практики в мужских стрижках и оформлении бороды.',
  },
  {
    icon: '🎯',
    title: 'Индивидуальный подход',
    text: 'Каждая стрижка подбирается под форму лица и образ жизни клиента.',
  },
  {
    icon: '⭐',
    title: 'Качество работы',
    text: 'Внимание к каждой детали — от линии виска до укладки.',
  },
  {
    icon: '💈',
    title: 'Стиль клиента',
    text: 'Помогаю подобрать образ, который подчёркивает индивидуальность.',
  },
];

export default function Hero() {
  const [photoRef, photoVisible] = useScrollReveal();
  const [textRef, textVisible] = useScrollReveal();

  return (
    <section className="hero" id="about">
      <div className="container hero__inner">
        <div
          ref={photoRef}
          className={`hero__photo reveal${photoVisible ? ' is-visible' : ''}`}
        >
          <div className="hero__photo-frame">
            <img src={masterPhoto} alt="Макс Елизаренко, мастер Barbershop" />
          </div>
        </div>

        <div
          ref={textRef}
          className={`hero__content reveal${textVisible ? ' is-visible' : ''}`}
        >
          <span className="hero__eyebrow">Персональный Barbershop</span>
          <h1 className="hero__title">
            Макс <em>Елизаренко</em>
          </h1>
          <p className="hero__text">
            Персональный мастер Barbershop с 22-летним опытом. Создаю
            индивидуальный стиль, выполняю классические и современные
            мужские стрижки, уделяю внимание деталям и качеству результата.
          </p>

          <div className="hero__traits">
            {TRAITS.map((trait) => (
              <div className="hero__trait" key={trait.title}>
                <span className="hero__trait-icon">{trait.icon}</span>
                <div>
                  <p className="hero__trait-title">{trait.title}</p>
                  <p className="hero__trait-text">{trait.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hero__actions">
            <a
              href="#booking"
              className="btn btn--gold"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Записаться
            </a>
            <a
              href="#services"
              className="btn btn--ghost"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Смотреть услуги
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
