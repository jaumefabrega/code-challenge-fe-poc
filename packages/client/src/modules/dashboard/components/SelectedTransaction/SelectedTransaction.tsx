import { useSelector } from "react-redux";
import { Transaction } from "../../../../../../lib-common/types";
import { RootState } from "../../../../redux/store";
import TransactionStatusChip from "../../../common/components/TransactionStatusChip/TransactionStatusChip";

type Props = {
  transaction?: Transaction;
};

const SelectedTransaction: React.FC<Props> = ({ transaction }) => {
  const users = useSelector((state: RootState) => state.users.data);
  const userName = users.find((u) => u.id === transaction?.userId)?.name;

  const formatedTime = transaction?.transactionTime
    ? new Date(transaction?.transactionTime).toUTCString()
    : "";
  if (!transaction) return <div>CLOSED DRAWER</div>;

  return (
    <div>
      <h3>{formatedTime}</h3>
      <TransactionStatusChip status={transaction.status} />
      <h5>{userName}</h5>
    </div>
  );
};

export default SelectedTransaction;
