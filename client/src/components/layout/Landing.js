import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">TrenchDev</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
            other developers
                    </p>
                    {!isAuthenticated && (
                        <div className="buttons">
                            <Link className="btn btn-primary" to='/register'>
                                Sign Up
                        </Link>
                            <Link className="btn btn-light" to='/login'>
                                Login
                        </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
