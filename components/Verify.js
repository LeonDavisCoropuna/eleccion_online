import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Verify = ({ isOpen, onRequestClose, onConfirm,text }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmación"
            ariaHideApp={false}
            className="modal-dialog"
        >
            <div className="modal-content container ">
                <div className="modal-header">
                    <h5 className="modal-title">{text}</h5>
                    <button type="button" className="close" onClick={onRequestClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>
                        Sí
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
                        No
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Verify;
