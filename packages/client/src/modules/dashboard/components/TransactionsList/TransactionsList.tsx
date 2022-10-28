import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Drawer } from "@mantine/core";

import { Transaction } from "../../../../../../lib-common/types";
import {
  FetchFilters,
  FilterableTransactionStatus,
} from "../../../../pages/dashboard/Dashboard";
import { RootState } from "../../../../redux/store";
import { smeService } from "../../../../services/sme.service";
import PageSelector from "../PageSelector/PageSelector";
import SelectedTransaction from "../SelectedTransaction/SelectedTransaction";
import TransactionItem from "../TransactionItem/TransactionItem";
import TransactionItemSkeleton from "../TransactionItem/TransactionItemSkeleton";

import styles from "./transactionList.module.scss";

export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

type Props = {
  selectedStatus?: FilterableTransactionStatus;
  fetchFilters: FetchFilters;
  setCurrentPage: (p: number) => void;
};

const initialPagination = {
  limit: 0,
  offset: 0,
  total: 0,
};

const TransactionsList: React.FC<Props> = ({
  selectedStatus,
  fetchFilters,
  setCurrentPage,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  useEffect(() => {
    const getTransactions = async () => {
      if (user?.id) {
        setLoadingTransactions(true);
        try {
          const {
            data: transactions,
            meta: { limit, total, offset },
          } = await smeService.fetchTransactions(
            fetchFilters.selectedPage,
            selectedStatus
          );
          setTransactions(transactions);
          setPagination({ limit, total, offset });
        } catch (error) {
          setTransactions([]);
          setPagination(initialPagination);
        } finally {
          setLoadingTransactions(false);
        }
      }
    };

    getTransactions();
  }, [user, fetchFilters]);

  const transactionItems = loadingTransactions
    ? Array.from(Array(10)).map((_, idx) => (
        <TransactionItemSkeleton key={idx} />
      ))
    : transactions.map((transaction) => (
        <TransactionItem
          transaction={transaction}
          key={transaction.id}
          setSelectedTransaction={setSelectedTransaction}
        />
      ));

  return (
    <>
      <div className={styles.list}>{transactionItems}</div>
      <PageSelector
        perPage={pagination.limit}
        offset={pagination.offset}
        total={pagination.total}
        setCurrentPage={setCurrentPage}
      />
      <Drawer
        opened={!!selectedTransaction}
        onClose={() => setSelectedTransaction(undefined)}
        position="right"
        overlayOpacity={0.7}
        padding="xs"
        lockScroll={false}
      >
        <SelectedTransaction transaction={selectedTransaction} />
      </Drawer>
    </>
  );
};

export default TransactionsList;
