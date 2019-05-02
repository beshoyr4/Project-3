import React, { Component } from 'react';
import SavedModal from '../../components/SavedModal/SavedModal';
import Saved from '../Saved'

export default (props) => {
    return (
        <div className="modal-container">
            <div className="back-drop" />
            <SavedModal className="modal" {...props} />
        </div>
    );
}
