import { useState } from "react";

import {
  TransactionStatus,
  TransactionStatusEnum,
} from "../../../../lib-common/types";
import TransactionsList from "../../modules/dashboard/components/TransactionsList/TransactionsList";

const transactionStatusAll = "ALL";

type TransactionStatusAll = typeof transactionStatusAll;

export type FilterTransactionStatus =
  | TransactionStatusAll
  | Exclude<TransactionStatus, typeof TransactionStatusEnum.Reversed>;

const fetchableTransactionStatuses = [
  ["All", transactionStatusAll],
  ...Object.entries(TransactionStatusEnum).filter(
    ([_, value]) => value !== TransactionStatusEnum.Reversed
  ),
];

export type FetchFilters = {
  selectedStatus?: FilterTransactionStatus;
  selectedPage: number;
};

const Dashboard: React.FC = () => {
  const [fetchFilters, setFetchFilters] = useState<FetchFilters>({
    selectedStatus: undefined,
    selectedPage: 0,
  });

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    const newValue = value === transactionStatusAll ? undefined : value;
    setFetchFilters({
      selectedPage: 0,
      selectedStatus: newValue as FilterTransactionStatus,
    });
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <select onChange={handleStatusChange} value={fetchFilters.selectedStatus}>
        {fetchableTransactionStatuses.map(([key, value]) => (
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
    </div>
  );
};

export default Dashboard;
