import React from 'react';

import './SavedModal.css';

const SavedModal = (props) => {
    return (
        <div className="modal-wrapper">
            <div className="modal-header">
                <h3>Full Profile Info</h3>
                <button className="close-modal-btn" onClick={ props.onClose }>X</button>
            </div>
            <div className="modal-body">
                { props.children }
            </div>
        </div>
    )
}

export default SavedModal;
