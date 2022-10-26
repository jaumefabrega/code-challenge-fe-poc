import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Transaction } from "../../../../../../lib-common/types";
import {
  FetchFilters,
  FilterTransactionStatus,
} from "../../../../pages/dashboard/Dashboard";
import { RootState } from "../../../../redux/store";
import { smeService } from "../../../../services/sme.service";
import PageSelector from "../PageSelector/PageSelector";
import SelectedTransaction from "../SelectedTransaction/SelectedTransaction";
import TransactionItem from "../TransactionItem/TransactionItem";

export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

type Props = {
  selectedStatus?: FilterTransactionStatus;
  fetchFilters: FetchFilters;
  setCurrentPage: (p: number) => void;
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
  const [pagination, setPagination] = useState<Pagination>({
    limit: 0,
    offset: 0,
    total: 0,
  });

  useEffect(() => {
    setSelectedTransaction(undefined);
  }, [transactions]);

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
        } finally {
          setLoadingTransactions(false);
        }
      }
    };
    getTransactions();
  }, [user, fetchFilters]);

  const transactionItems = loadingTransactions
    ? Array.from(Array(10)).map((_, idx) => <TransactionItem key={idx} />)
    : transactions.map((transaction) => (
        <TransactionItem
          transaction={transaction}
          key={transaction.id}
          setSelectedTransaction={setSelectedTransaction}
        />
      ));

  return (
    <>
      <div>
        <PageSelector
          perPage={pagination.limit}
          offset={pagination.offset}
          total={pagination.total}
          setCurrentPage={setCurrentPage}
        />
        <ul>{transactionItems}</ul>
      </div>
      {selectedTransaction && (
        <SelectedTransaction transaction={selectedTransaction} />
      )}
    </>
  );
};

export default TransactionsList;
