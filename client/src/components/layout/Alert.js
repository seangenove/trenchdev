import React, { Fragment } from 'react';
import { connect } from 'react-redux'

const Alert = ({ alerts }) => {
    return (
        <Fragment>

            {alerts !== null && alerts.length > 0 && (
                <div className={`alert alert-${alerts[0].alertType}`}>
                    {
                        alerts.map(alert => (
                            <p key={alert.id}>
                                {alert.msg}
                            </p>
                        ))
                    }
                </div>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alerts ? state.alerts : null,
    }
};

export default connect(mapStateToProps)(Alert);
