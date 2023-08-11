import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Success = ({ show, handleClose, isSuccess }) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={handleClose}
            className="modal-dialog modal-dialog-centered"
            contentLabel="Resultado de la operación"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Resultado de la operación</h5>
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {isSuccess ? (
                        <div>
                            <p className="text-success">¡Operación exitosa!</p>
                            <img src="/success.png" alt="Éxito" />
                        </div>
                    ) : (
                        <div>
                            <p className="text-danger">La operación ha fallado.</p>
                            <img src="/error.png" alt="Error" />
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                        Ok
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Success;
