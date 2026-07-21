import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header" id="header">
      <div className="container header__inner">
        <a
          href="#about"
          className="header__logo"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          MAX <span>ELIZARENKO</span>
        </a>

        <nav className={`nav${isOpen ? ' is-open' : ''}`} id="nav">
          <ul className="nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav__link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#booking"
            className="btn btn--gold nav__cta"
            onClick={(e) => handleNavClick(e, '#booking')}
          >
            Записаться
          </a>
        </nav>

        <button
          className="burger"
          aria-label="Открыть меню"
          aria-expanded={isOpen}
          aria-controls="nav"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`overlay${isOpen ? ' is-visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </header>
  );
}
