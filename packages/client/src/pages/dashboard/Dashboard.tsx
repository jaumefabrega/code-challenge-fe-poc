import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Transaction,
  TransactionStatus,
  TransactionStatusEnum,
} from "../../../../lib-common/types";
import { smeService } from "../../services/sme.service";
import { logout } from "../../redux/auth.redux";
import { RootState } from "../../redux/store";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { selectedTransactionId } = useParams();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus>(
    TransactionStatusEnum.Completed
  );

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedStatus(value as TransactionStatus);
  };
  useEffect(() => {
    const getTransactions = async () => {
      if (user?.id) {
        setLoadingTransactions(true);
        try {
          const transactions = await smeService.fetchTransactions(
            user.id,
            selectedStatus
          );
          setTransactions(transactions);
        } catch (error) {
          setTransactions([]);
        } finally {
          setLoadingTransactions(false);
        }
      }
    };
    getTransactions();
  }, [user, selectedStatus]);

  if (loadingTransactions) return <div>Loading...</div>;
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
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>{transaction.id}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(logout())}>LOGOUT</button>
      <h2>Selected transaction id: {selectedTransactionId}</h2>
    </div>
  );
};

export default Dashboard;
