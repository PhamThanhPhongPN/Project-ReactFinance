import { useState } from "react";
import "./CategoryAddModal.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import upload from "../../assets/images/upload.png";
import del from "../../assets/images/delete.png";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/useRedux";
import { createCategoryThunk, updateCategoryThunk } from "../../stores/thunks/categoryThunks";
import { CategoryStatus } from "../../types/category.type";
import { setSelectedCategory } from "../../stores/slices/categorySlice";

interface CategoryAddModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function CategoryAddModal({ show, handleClose }: CategoryAddModalProps) {
  const dispatch = useAppDispatch();
  const { selectedCategory, isLoading } = useAppSelector((state) => state.categoryManagement);
  
  const [name, setName] = useState(selectedCategory?.name || "");
  const [imageUrl, setImageUrl] = useState(selectedCategory?.imageUrl || "");
  const [imagePreview, setImagePreview] = useState<string | null>(
    selectedCategory?.imageUrl && selectedCategory.imageUrl !== "đường dẫn ảnh" 
      ? selectedCategory.imageUrl 
      : null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setImageUrl("");
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }

    if (selectedCategory) {
      await dispatch(updateCategoryThunk({
        categoryId: selectedCategory.id,
        categoryData: {
          name: name.trim(),
          imageUrl: imageUrl || "đường dẫn ảnh",
        }
      }));
    } else {
      await dispatch(createCategoryThunk({
        name: name.trim(),
        imageUrl: imageUrl || "đường dẫn ảnh",
        status: CategoryStatus.ACTIVE,
      }));
    }

    handleModalClose();
  };

  const handleModalClose = () => {
    setName("");
    setImageUrl("");
    setImagePreview(null);
    dispatch(setSelectedCategory(null));
    handleClose();
  };

  useState(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setImageUrl(selectedCategory.imageUrl);
      setImagePreview(
        selectedCategory.imageUrl && selectedCategory.imageUrl !== "đường dẫn ảnh"
          ? selectedCategory.imageUrl
          : null
      );
    } else {
      setName("");
      setImageUrl("");
      setImagePreview(null);
    }
  });

  return (
    <Modal show={show} onHide={handleModalClose} centered className="category-add-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedCategory ? "Edit Category" : "Add Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-form">
          <label className="form-label">
            Name <span style={{color: 'red'}}>*</span>
          </label>
          <input 
            type="text" 
            className="form-control category-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
          
          <div className="upload-section">
            <label htmlFor="image-upload">
              <button 
                className="upload-btn"
                type="button"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <img src={upload} alt="upload" width="24px" height="24px"/>
              </button>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="preview" width="50" height="50" />
                <span>{name || "Image preview"}</span>
                <button className="delete-btn" onClick={handleDeleteImage} type="button">
                  <img src={del} alt="delete" width="40px" height="40px"/>
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={handleModalClose} 
          style={{backgroundColor: '#E4E4E7', border: 'none', color:'black'}}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          variant="warning" 
          onClick={handleSave} 
          style={{backgroundColor: '#FF7802', border: 'none', color:'white'}}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}