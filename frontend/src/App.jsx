import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// Pages
import Home from './pages/Home';
import PropertyListing from './pages/PropertyListing';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import Favorites from './pages/Favorites';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SearchResults from './pages/SearchResults';
import RecentlySearched from './pages/RecentlySearched';
import RecentlyViewed from './pages/RecentlyViewed';
import Contacted from './pages/Contacted';
import Services from './pages/Services';
// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<PropertyListing />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recently-searched" element={<RecentlySearched />} />
              <Route path="/recently-viewed" element={<RecentlyViewed />} />
              <Route path="/contacted" element={<Contacted />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
