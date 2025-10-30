import "./CategoryAddModal.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import upload from "../../assets/images/upload.png";
import del from "../../assets/images/delete.png";

interface CategoryAddModalProps{
    show: boolean;
    handleClose: () => void;
}

export default function CategoryAddModal({ show, handleClose }: CategoryAddModalProps) {
  return (
    <Modal show={show} onHide={handleClose} centered className="category-add-modal">
      <Modal.Header closeButton>
        <Modal.Title>Form Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-form">
          <label className="form-label">Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" className="form-control category-input" />
          
          <div className="upload-section">
            <button className="upload-btn">
              <img src={upload} alt="upload" width="24px" height="24px"/>
            </button>
            <div className="image-preview">
              <img src="/path/to/image.png" alt="preview" width="50" height="50" />
              <span></span>
              <button className="delete-btn">
                <img src={del} alt="del" width="40px" height="40px"/>
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} style={{backgroundColor: '#E4E4E7', border: 'none', color:'black'}}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleClose} style={{backgroundColor: '#FF7802', border: 'none', color:'white'}}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}