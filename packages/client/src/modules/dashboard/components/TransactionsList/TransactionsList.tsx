import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Transaction,
  TransactionStatus,
} from "../../../../../../lib-common/types";
import { RootState } from "../../../../redux/store";
import { smeService } from "../../../../services/sme.service";
import TransactionItem from "../TransactionItem/TransactionItem";

type Props = {
  selectedStatus: TransactionStatus;
};
const TransactionsList: React.FC<Props> = ({ selectedStatus }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { selectedTransactionId } = useParams();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

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

  const transactionItems = loadingTransactions
    ? Array.from(Array(10)).map((t, idx) => <TransactionItem key={idx} />)
    : transactions.map((transaction) => (
        <TransactionItem transaction={transaction} key={transaction.id} />
      ));

  return <ul>{transactionItems}</ul>;
};

export default TransactionsList;
