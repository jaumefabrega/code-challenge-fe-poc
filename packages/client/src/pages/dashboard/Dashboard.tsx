import { useState } from "react";
import { SegmentedControl } from "@mantine/core";

import {
  TransactionStatus,
  TransactionStatusEnum,
} from "../../../../lib-common/types";
import TransactionsList from "../../modules/dashboard/components/TransactionsList/TransactionsList";

import styles from "./dashboard.module.scss";

const transactionStatusAll = "ALL";

type TransactionStatusAll = typeof transactionStatusAll;

export type FilterTransactionStatus =
  | TransactionStatusAll
  | Exclude<TransactionStatus, typeof TransactionStatusEnum.Reversed>;

const fetchableTransactionStatuses = [
  { label: "ALL", value: transactionStatusAll },
  ...Object.entries(TransactionStatusEnum)
    .map(([label, value]) => ({ label, value }))
    .filter((entry) => entry.value !== TransactionStatusEnum.Reversed),
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

  const handleStatusChange = async (value: string) => {
    const newValue = value === transactionStatusAll ? undefined : value;
    setFetchFilters({
      selectedPage: 0,
      selectedStatus: newValue as FilterTransactionStatus,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Transactions</h1>
      <div className={styles.content}>
        <SegmentedControl
          data={fetchableTransactionStatuses}
          value={
            fetchFilters.selectedStatus === undefined
              ? transactionStatusAll
              : fetchFilters.selectedStatus
          } // FIX: use "ALL" instead and filter directly in the api (cleaner)
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
