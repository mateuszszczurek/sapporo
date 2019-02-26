import * as React from "react";

const pageHeader = {
    paddingBottom: '9px',
    'margin': '40px 0 20px',
    borderBottom: '1px solid #eee',
};

const inlinedHeader = {display: 'inline'};

export default () =>
    <div style={pageHeader}>
        <h1 style={inlinedHeader}>Volleyball Tournament App+</h1>
        <span className='float-right pt-3'>
            <small><i><b>{process.env.REACT_APP_NAME}</b> {process.env.REACT_APP_VERSION}</i></small>
        </span>
    </div>

