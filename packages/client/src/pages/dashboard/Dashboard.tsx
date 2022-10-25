import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  TransactionStatus,
  TransactionStatusEnum,
} from "../../../../lib-common/types";
import TransactionsList from "../../modules/dashboard/components/TransactionsList/TransactionsList";
import { RootState } from "../../redux/store";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { selectedTransactionId } = useParams();

  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus>(
    TransactionStatusEnum.Completed
  );

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedStatus(value as TransactionStatus);
  };

  return (
    <div>
      <h3>Dashboard</h3>
      {user?.name}
      <br />
      <br />
      <select onChange={handleStatusChange} value={selectedStatus}>
        {Object.entries(TransactionStatusEnum).map(([key, value]) => (
          <option value={value} key={value}>
            {key}
          </option>
        ))}
      </select>
      <TransactionsList selectedStatus={selectedStatus} />
      <h2>Selected transaction id: {selectedTransactionId}</h2>
    </div>
  );
};

export default Dashboard;
