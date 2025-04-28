import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Contact from './pages/contact/contact';
import Header from './pages/header/header';
import SecondHeader from './pages/header/secondHeader';
import Footer from './pages/footer/footer';
import Engagement from './pages/engagement/engagement';
import About from './pages/about/about';
import Diamond from './pages/diamond/diamond';
import Terms from './pages/terms-conditions/terms';
import Policy from './pages/policy/policy';
import Weddingbrands from './pages/wedding-brands/weddingBrands';
import RingStyle from './pages/engagemnet-ring-style/ringStyle';
import DiamondDetails from './pages/diamond-detail/diamondDetails/diamondDetails';




export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {isHome ? <Header /> : <SecondHeader />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/about" element={<About />} />
          <Route path="/diamond" element={<Diamond />} />
          <Route path="/terms" element={<Terms />}  />
          <Route path="/policy" element={<Policy /> } />
          <Route path="/wedding-brands" element={<Weddingbrands/> } />
          <Route path="/engagement-ring-style" element={<RingStyle />} />
          <Route path="/diamond-details" element={<DiamondDetails /> } />
          

        </Routes>
      </main>
      <Footer />
    </>
  );
}
