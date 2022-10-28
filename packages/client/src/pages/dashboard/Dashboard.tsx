import { useState } from "react";
import { SegmentedControl } from "@mantine/core";

import {
  TransactionStatus,
  TransactionStatusEnum,
} from "../../../../lib-common/types";
import TransactionsList from "../../modules/dashboard/components/TransactionsList/TransactionsList";

import styles from "./dashboard.module.scss";

export const transactionStatusAll = "ALL";

type TransactionStatusAll = typeof transactionStatusAll;

export type FilterableTransactionStatus =
  | TransactionStatusAll
  | Exclude<TransactionStatus, typeof TransactionStatusEnum.Reversed>;

const fetchableTransactionStatuses = [
  { label: "ALL", value: transactionStatusAll },
  ...Object.entries(TransactionStatusEnum)
    .map(([label, value]) => ({ label, value }))
    .filter((entry) => entry.value !== TransactionStatusEnum.Reversed),
];

export type FetchFilters = {
  selectedStatus?: FilterableTransactionStatus;
  selectedPage: number;
};

const Dashboard: React.FC = () => {
  const [fetchFilters, setFetchFilters] = useState<FetchFilters>({
    selectedStatus: transactionStatusAll,
    selectedPage: 0,
  });

  const handleStatusChange = async (value: string) => {
    setFetchFilters({
      selectedPage: 0,
      selectedStatus: value as FilterableTransactionStatus,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Transactions</h1>
      <div className={styles.content}>
        <SegmentedControl
          data={fetchableTransactionStatuses}
          value={fetchFilters.selectedStatus}
          onChange={handleStatusChange}
          className={styles.statusFilter}
        />
        <TransactionsList
          selectedStatus={fetchFilters.selectedStatus}
          setCurrentPage={(page: number) =>
            setFetchFilters((prev) => ({ ...prev, selectedPage: page }))
          }
          fetchFilters={fetchFilters}
        />
      </div>
    </div>
  );
};

export default Dashboard;
