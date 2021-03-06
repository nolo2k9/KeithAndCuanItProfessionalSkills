// Parrot component for other profile objects
// Is the main profile page displaying most of the users profile data
// brings in our state and profile data into the profile
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    // checks if profile is there or loading
    // If its the current users profile, show an edit option
    // Bring in ProfileTop and ProfileAbout components into our Fragment
    // Then bring in Experience and Education as long as they exist ( >0 )
    // Finally checks for a github user name and displays the github component if true
    return ( 
    <Fragment>
        {profile === null || loading ? (<Spinner /> 
        ) : (
            <Fragment>
                <Link to='/profiles' className="btn btn-light">
                    Back To Profiles
                </Link>
                {auth.isAuthenticated && applicationCache.loading === false && auth.user._id === 
                    profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (<Fragment>
                            {profile.experience.map(experience => (
                                <ProfileExperience key={experience._id} experience={experience}></ProfileExperience>
                            ))}
                        </Fragment>) : (<h4>No Experience credentials</h4>)}
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? (<Fragment>
                            {profile.education.map(education => (
                                <ProfileEducation key={education._id} education={education}></ProfileEducation>
                            ))}
                        </Fragment>) : (<h4>No Education credentials</h4>)}
                    </div>
                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername}/>
                    )}
                </div>
            </Fragment>
        )}
    </Fragment>
    );
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
