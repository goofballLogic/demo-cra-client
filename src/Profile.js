import React from "react";
import "./Profile.css";

const Profile = ({ data, err }) =>
    <article className="profile">
        Profile
        {err
            ? <div className="error">An error occurred fetching profile: {err.stack || err.message || err}</div>
            : data && <div>
                <h1>{data.name}</h1>
            </div>}
    </article>;

export default Profile;