import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/useRedux';
import { updateUserThunk } from '../../stores/thunks/userThunks';

interface ChangeInfoModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ChangeInfoModal({ show, onHide }: ChangeInfoModalProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: true,
  });
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        phone: user.phone,
        gender: user.gender,
      });
    }
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'gender') {
      setFormData(prev => ({ ...prev, gender: value === 'true' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { fullName: '', phone: '' };

    if (formData.fullName.trim().length === 0) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }

    if (formData.phone.trim().length > 0 && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !user) return;

    setIsLoading(true);
    const result = await dispatch(
      updateUserThunk({
        userId: user.id,
        userData: formData,
      })
    );

    setIsLoading(false);

    if (updateUserThunk.fulfilled.match(result)) {
      alert('Information updated successfully!');
      window.location.reload(); 
      onHide();
    } else {
      alert('Failed to update information');
    }
  };

  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10 digits"
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender.toString()}
              onChange={handleChange}
            >
              <option value="true">Male</option>
              <option value="false">Female</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}