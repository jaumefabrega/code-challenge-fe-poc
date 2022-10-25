import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Transaction,
  TransactionStatus,
} from "../../../../../../lib-common/types";
import { FetchFilters } from "../../../../pages/dashboard/Dashboard";
import { RootState } from "../../../../redux/store";
import { smeService } from "../../../../services/sme.service";
import PageSelector from "../PageSelector/PageSelector";
import TransactionItem from "../TransactionItem/TransactionItem";

export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

type Props = {
  selectedStatus: TransactionStatus;
  fetchFilters: FetchFilters;
  setCurrentPage: (p: number) => void;
};

const TransactionsList: React.FC<Props> = ({
  selectedStatus,
  fetchFilters,
  setCurrentPage,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { selectedTransactionId } = useParams();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 0,
    offset: 0,
    total: 0,
  });

  useEffect(() => {
    const getTransactions = async () => {
      if (user?.id) {
        setLoadingTransactions(true);
        try {
          const {
            data: transactions,
            meta: { limit, total, offset },
          } = await smeService.fetchTransactions(
            user.id,
            selectedStatus,
            fetchFilters.selectedPage
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
        <TransactionItem transaction={transaction} key={transaction.id} />
      ));

  return (
    <div>
      <PageSelector
        perPage={pagination.limit}
        offset={pagination.offset}
        total={pagination.total}
        setCurrentPage={setCurrentPage}
      />
      <ul>{transactionItems}</ul>
    </div>
  );
};

export default TransactionsList;
