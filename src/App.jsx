import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Contacts from './components/Contacts';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Reviews />
        <BookingForm />
        <Contacts />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Barbershop Макс Елизаренко. Все права защищены.</p>
      </footer>
    </>
  );
}

export default App;
