import Table from "react-bootstrap/Table";
import active from "../../assets/images/active.png";
import inactive from "../../assets/images/Inactive.png";
import "./CategoryTable.css";

interface Category {
  id: number;
  name: string;
  image?: string;
  status: boolean;
}

interface CategoryTableProps {
  data: Category[];
}

export default function CategoryTable({ data }: CategoryTableProps) {
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
          {data.map((category) => (
            <tr key={category.id}>
              <td className="stt">{category.id}</td>
              <td>{category.name}</td>
              <td></td>
              <td>
                <img 
                  src={category.status ? active : inactive} 
                  alt={category.status ? "active" : "inactive"} 
                  width={category.status ? "65px" : "75px"} 
                  height="22px"
                />
              </td>
              <td>
                <div className={category.status ? "category-action" : "category-actions"}>
                  <button className="edit-btn">Edit</button>
                  {category.status ? (
                    <button className="block-btn">Block</button>
                  ) : (
                    <button className="unblock-btn">Unblock</button>
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