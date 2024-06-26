// import React from "react";
import { useState, useEffect } from "react";  
import getUser from "../services/user.service.js"; 

const UserProfile = ( ) => {
    const { id } = useParams();
    const [userDataIsLoading, setUserDataIsLoading] = useState(true);
    const [userData, setUserData] = useState(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            setUserDataIsLoading(true);
            let user = null;
            try {
                user = await getUser(id);
                setUserData(user);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setUserDataIsLoading(false);
            }
        }; 
 
        const fetchData = async () => {
        if (!userData) {
            await fetchUserData();
        } else await fetchRoleData(userData[0]);
        };
        fetchData();
    }, [userData]);

    const getInterestedOpportunityIds = (userData) => {
        return userData.roles.map((role) => {
        if (role.status === "interested") return role.role_id;
        });
    };

    const filterOpportunitiesByuser = (
        interestedOpportunityIDs,
        opportunitiesData
    ) => {
        return opportunitiesData.filter((opportunity) =>
        interestedOpportunityIDs.includes(opportunity._id)
        );
    };

    if (
        userDataIsLoading ||
        opportunitiesDataIsLoading ||
        clientIdNameMapDataIsLoading
    ) {
        return (
        <div className="container ">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card p-2 my-2 w-100">Loading...</div>
            </div>
        </div>
        );
    }

    if (!userData || !opportunitiesData ) {
        return (
        <div className="container ">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card p-2 my-2 w-100">Error loading data!</div>
            </div>
        </div>
        );
    }

    const address =
        !userDataIsLoading && userData[0].address ? (
        <>
            {userData[0].address.line1} <br />
            {userData[0].address.city} <br />
            {userData[0].address.postcode}
        </>
        ) : (
        <></>
        );

    return (
        <div className="row pt-2 justify-content-center">
        <div className="card pl-4 pr-4 pb-4 col-12 col-md-10 col-lg-6 ">
            <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="card my-2">
                <div className="card-body p-2">
                <div>
                    <userPersonalInformationOverview
                    userData={userData[0]}
                    />
                    <div className="p-2 d-sm-flex flex-md-row gap-3">
                    <div className="col-sm-6">
                        Address: <br />
                        {address}
                    </div>
                    <br />
                    <div className="col-sm-6">
                        Phone Number: <br /> {userData[0].phoneNumber}
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="p-0">
                <div className="d-sm-flex flex-md-row gap-3">
                <userPreferencesTable
                    data={userData[0].locationPreferences.map((item) => (
                    <div key={item}>{item}</div>
                    ))}
                    pref={"Location"}
                    className="flex-grow-1"
                /> 
                </div> 
            </div>
            <div className="p-0 mt-3 card">
                <h4 className="px-3 pt-2" style={{ marginBottom: "-20px" }}>
                Registered Interests
                </h4>
                <div className="d-sm-flex flex-md-row gap-3">
                 
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default UserProfile;