import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  TransactionStatus,
  TransactionStatusEnum,
} from "../../../../lib-common/types";
import TransactionsList from "../../modules/dashboard/components/TransactionsList/TransactionsList";

export type FetchFilters = {
  selectedStatus: TransactionStatus;
  selectedPage: number;
};

const Dashboard: React.FC = () => {
  const { selectedTransactionId } = useParams();

  const [fetchFilters, setFetchFilters] = useState<FetchFilters>({
    selectedStatus: TransactionStatusEnum.Completed,
    selectedPage: 0,
  });

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setFetchFilters({
      selectedPage: 0,
      selectedStatus: value as TransactionStatus,
    });
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <select onChange={handleStatusChange} value={fetchFilters.selectedStatus}>
        {Object.entries(TransactionStatusEnum).map(([key, value]) => (
          <option value={value} key={value}>
            {key}
          </option>
        ))}
      </select>
      <TransactionsList
        selectedStatus={fetchFilters.selectedStatus}
        setCurrentPage={(page: number) =>
          setFetchFilters((prev) => ({ ...prev, selectedPage: page }))
        }
        fetchFilters={fetchFilters}
      />
      <h2>Selected transaction id: {selectedTransactionId}</h2>
    </div>
  );
};

export default Dashboard;
