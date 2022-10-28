import { useSelector } from "react-redux";
import { Transaction } from "../../../../../../lib-common/types";
import { RootState } from "../../../../redux/store";
import TransactionStatusChip from "../../../common/components/TransactionStatusChip/TransactionStatusChip";

import styles from "./selectedTransaction.module.scss";

type Props = {
  transaction?: Transaction;
};

const SelectedTransaction: React.FC<Props> = ({ transaction }) => {
  if (!transaction) return null;

  const users = useSelector((state: RootState) => state.users.data);
  const userName = users.find((u) => u.id === transaction.userId)?.name;
  const formatedTime = transaction.transactionTime
    ? new Date(transaction?.transactionTime).toUTCString()
    : "";
  const shortenedId = transaction.id.substring(0, 7);

  return (
    <div className={styles.container}>
      <div className={styles.id}>ID {shortenedId}</div>
      <div>{formatedTime}</div>
      <div>{userName}</div>
      <TransactionStatusChip status={transaction.status} />
    </div>
  );
};

export default SelectedTransaction;
