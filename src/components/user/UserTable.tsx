import Table from "react-bootstrap/Table";
import "./UserTable.css"
import active from "../../assets/images/active.png";
import unlock from "../../assets/images/unlock.png";
import deactivate from "../../assets/images/deactivate.png";
import lock from "../../assets/images/lock.png";

export default function UserTable() {
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
        <tr>
          <td className="stt">1</td>
          <td>Nguyen Van A</td>
          <td>nguyenvana@gmail.com</td>
          <td>0987654321</td>
          <td>Female</td>
          <td><img src={active} alt="active" width="65px" height="22px" /></td>
          <td><img src={unlock} alt="unlock" width="40px" height="40px"/></td>
        </tr>
        <tr>
          <td className="stt">2</td>
          <td>Pham Thi B</td>
          <td>phamthib@gmail.com</td>
          <td>0987654321</td>
          <td>Male</td>
          <td><img src={active} alt="deactivate" width="65px" height="22px" /></td>
          <td><img src={lock} alt="lock" width="40px" height="40px"/></td>
        </tr>
        <tr>
          <td className="stt">3</td>
          <td>Pham Thi B</td>
          <td>phamthib@gmail.com</td>
          <td>0987654321</td>
          <td>Male</td>
          <td><img src={deactivate} alt="deactivate" width="90px" height="22px" /></td>
          <td><img src={unlock} alt="lock" width="40px" height="40px"/></td>
        </tr>
        <tr>
          <td className="stt">4</td>
          <td>Pham Thi B</td>
          <td>phamthib@gmail.com</td>
          <td>0987654321</td>
          <td>Male</td>
          <td><img src={active} alt="deactivate" width="65px" height="22px" /></td>
          <td><img src={unlock} alt="lock" width="40px" height="40px"/></td>
        </tr>
        <tr>
          <td className="stt">5</td>
          <td>Pham Thi B</td>
          <td>phamthib@gmail.com</td>
          <td>0987654321</td>
          <td>Male</td>
          <td><img src={deactivate} alt="deactivate" width="90px" height="22px" /></td>
          <td><img src={lock} alt="lock" width="40px" height="40px"/></td>
        </tr>
      </tbody>
    </Table>
  );
}
