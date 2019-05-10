import React from 'react';
import SavedModal from '../../components/SavedModal/SavedModal';

export default (props) => {
    return (
        <div className="modal-container">
            <div className="back-drop" />
            <SavedModal className="modal" {...props} />
        </div>
    );
}
