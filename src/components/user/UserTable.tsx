import Table from "react-bootstrap/Table";
import "./UserTable.css";
import active from "../../assets/images/active.png";
import unlock from "../../assets/images/unlock.png";
import deactivate from "../../assets/images/deactivate.png";
import lock from "../../assets/images/lock.png";
import { type User, UserStatus } from "../../types/user.type";

interface UserTableProps {
  data: User[];
  onToggleStatus: (userId: string, currentStatus: UserStatus) => void;
}

export default function UserTable({ data, onToggleStatus }: UserTableProps) {
  return (
    <Table bordered hover size="sm" className="table">
      <thead>
        <tr>
          <th className="stt">STT</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={user.id}>
            <td className="stt">{index + 1}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.phone || "N/A"}</td>
            <td>{user.gender ? "Male" : "Female"}</td>
            <td>
              <img
                src={user.status === UserStatus.ACTIVE ? active : deactivate}
                alt={user.status}
                width={user.status === UserStatus.ACTIVE ? "65px" : "90px"}
                height="22px"
              />
            </td>
            <td>
              <img
                src={user.status === UserStatus.ACTIVE ? unlock : lock}
                alt="toggle-status"
                width="40px"
                height="40px"
                style={{ cursor: 'pointer' }}
                onClick={() => onToggleStatus(user.id, user.status)}
                title={user.status === UserStatus.ACTIVE ? "Deactivate" : "Activate"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}