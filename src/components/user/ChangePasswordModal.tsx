import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/useRedux';
import { updateUserThunk } from '../../stores/thunks/userThunks';

interface ChangePasswordModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ChangePasswordModal({ show, onHide }: ChangePasswordModalProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (formData.currentPassword.trim().length === 0) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    } else if (user && formData.currentPassword !== user.password) {
      newErrors.currentPassword = 'Current password is incorrect';
      isValid = false;
    }

    if (formData.newPassword.trim().length === 0) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.confirmPassword.trim().length === 0) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        userData: { password: formData.newPassword },
      })
    );

    setIsLoading(false);

    if (updateUserThunk.fulfilled.match(result)) {
      alert('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      onHide();
    } else {
      alert('Failed to change password');
    }
  };

  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              isInvalid={!!errors.currentPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="At least 6 characters"
              isInvalid={!!errors.newPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}