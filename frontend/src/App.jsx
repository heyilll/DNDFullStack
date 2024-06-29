import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx'; 
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import CampaignView from './components/CampaignView.jsx';
import CharacterView from './components/CharacterView.jsx';
import UserProfile from './components/UserProfile.jsx';
import MyView from './components/MyView.jsx';
import AddCharacter from './components/AddCharacter.jsx';
import AddCampaign from './components/AddCampaign.jsx';
import accService from './services/account.service.js';
import { useEffect } from 'react';

const App = () => {  

    // useEffect(() => {
    //     const user = accService.getCurrentUser();

    //     if (user) {
    //         setCurrentUser(user);
    //         setShowModeratorBoard(user.roles.includes(`ROLE_MODERATOR`));
    //         setShowAdminBoard(user.roles.includes(`ROLE_ADMIN`));
    //     }
    // }, []);

    // const logOut = () => {
    //     accService.logout();
    // }
    
    return (
        <div className='app'>
            <div className='main'>
                <Header /> 
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/campaigns/:id"
                        element={<CampaignView />}
                    />  
                    <Route
                        path="/characters/:id"
                        element={<CharacterView />}
                    />  
                    <Route
                        path="/users/:id"
                        element={<UserProfile />}
                    />  
                    <Route
                        path="/myview"
                        element={<MyView />}
                    />  
                    <Route
                        path="/login"
                        element={<Login />}
                    />  
                    <Route
                        path="/register"
                        element={<Register />}
                    />  
                    <Route
                        path="/addCharacter"
                        element={<AddCharacter />}
                    />  
                    <Route
                        path="/addCampaign"
                        element={<AddCampaign />}
                    />  
                    <Route path="*" element={<p>Your 404 component</p>} />
                </Routes>
            </div>
        <Footer />
    </div>
    );
};

export default App;
