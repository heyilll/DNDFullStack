import React from 'react';
import accService from '../services/account.service'; 

const Profile = () => { 
    const currentUser = accService.getCurrentUser();

    return (

        <div className="container">
            {!currentUser && <p>Not logged in</p>}
            {currentUser &&
                <>
                    <header className="jumbotron">
                        <h3><strong>{currentUser.username}'s </strong> Profile</h3>
                    </header> 
                    <p>
                        <strong>Email:</strong> {currentUser.email}
                    </p>
                    <ul> 
                    </ul>
                </>
            }
        </div>
    );
};

export default Profile;