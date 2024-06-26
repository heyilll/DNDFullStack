import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx'; 
import Campaign from './components/Campaign.jsx';
import CharacterView from './components/CharacterView.jsx';
const App = () => {  

    return (
    <div className='app'>
        <Header />
            <Routes>
                {/* <Route
                    path="/"
                    element={<Home />}
                /> */}
                {/* <Route
                    path="/"
                    element={<Campaign />}
                />   */}
                <Route
                    path="/"
                    element={<CharacterView />}
                />  
                <Route path="*" element={<p>Your 404 component</p>} />
            </Routes> 
        <Footer />
    </div>
    );
};

export default App;
