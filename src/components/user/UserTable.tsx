import Table from "react-bootstrap/Table";
import "./UserTable.css"
import active from "../../assets/images/active.png";
import unlock from "../../assets/images/unlock.png";
import deactivate from "../../assets/images/deactivate.png";
import lock from "../../assets/images/lock.png";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
}

interface UserTableProps {
  data: UserData[];
}

export default function UserTable({ data }: UserTableProps) {
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
            <td className="stt">{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.gender}</td>
            <td>
              <img 
                src={user.status === 'active' ? active : deactivate} 
                alt={user.status} 
                width={user.status === 'active' ? "65px" : "90px"} 
                height="22px" 
              />
            </td>
            <td>
              <img 
                src={user.status === 'active' ? unlock : lock} 
                alt="action" 
                width="40px" 
                height="40px"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}