import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Footer from './Components/Footer.jsx';
import Header from './Components/Header.jsx';
import Home from './Components/Home.jsx'; 
const App = () => {  

    return (
    <div className='app'>
        <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />  
                <Route path="*" element={<p>Your 404 component</p>} />
            </Routes> 
        <Footer />
    </div>
    );
};

export default App;
