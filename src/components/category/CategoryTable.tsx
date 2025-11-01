import Table from "react-bootstrap/Table";
import active from "../../assets/images/active.png";
import inactive from "../../assets/images/Inactive.png";
import "./CategoryTable.css";
import { type Category, CategoryStatus } from "../../types/category.type";
import { useAppDispatch } from "../../stores/hooks/useRedux";
import { deleteCategoryThunk, toggleCategoryStatusThunk } from "../../stores/thunks/categoryThunks";
import { setSelectedCategory } from "../../stores/slices/categorySlice";
import { useState } from "react";

interface CategoryTableProps {
  data: Category[];
}

export default function CategoryTable({ data }: CategoryTableProps) {
  const dispatch = useAppDispatch();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleToggleStatus = async (category: Category) => {
    await dispatch(toggleCategoryStatusThunk({ 
      categoryId: category.id, 
      currentStatus: category.status 
    }));
  };

  const handleEdit = (category: Category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleDelete = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setDeletingId(categoryId);
      await dispatch(deleteCategoryThunk(categoryId));
      setDeletingId(null);
    }
  };

  return (
    <div>
      <Table bordered hover className="category-table">
        <thead>
          <tr>
            <th className="stt">STT</th>
            <th>Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <tr key={category.id}>
              <td className="stt">{index + 1}</td>
              <td>{category.name}</td>
              <td>
                {category.imageUrl && category.imageUrl !== "đường dẫn ảnh" && (
                  <img src={category.imageUrl} alt={category.name} width="50" height="50" />
                )}
              </td>
              <td>
                <img 
                  src={category.status === CategoryStatus.ACTIVE ? active : inactive} 
                  alt={category.status === CategoryStatus.ACTIVE ? "active" : "inactive"} 
                  width={category.status === CategoryStatus.ACTIVE ? "65px" : "75px"} 
                  height="22px"
                />
              </td>
              <td>
                <div className={category.status === CategoryStatus.ACTIVE ? "category-action" : "category-actions"}>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  {category.status === CategoryStatus.ACTIVE ? (
                    <button 
                      className="block-btn"
                      onClick={() => handleToggleStatus(category)}
                      disabled={deletingId === category.id}
                    >
                      Block
                    </button>
                  ) : (
                    <button 
                      className="unblock-btn"
                      onClick={() => handleToggleStatus(category)}
                      disabled={deletingId === category.id}
                    >
                      Unblock
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}