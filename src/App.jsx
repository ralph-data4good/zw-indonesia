import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import MapDirectory from './routes/MapDirectory';
import Resources from './routes/Resources';
import Campaigns from './routes/Campaigns';
import Events from './routes/Events';
import Calculator from './routes/Calculator';
import About from './routes/About';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapDirectory />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/events" element={<Events />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

