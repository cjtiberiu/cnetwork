import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

const AppModal = (props) => {
  return ReactDOM.createPortal(
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      {props.children}
    </Modal>, document.getElementById('modal'),
  );
};

export default AppModal;