import { Transaction } from "../../../../../../lib-common/types";
import FormattedDate from "../../../common/components/FormattedDate/FormattedDate";
import PaymentAmount from "../../../common/components/PaymentAmount/PaymentAmount";
import TransactionStatusChip from "../../../common/components/TransactionStatusChip/TransactionStatusChip";

import styles from "./transactionItem.module.scss";

type Props = {
  transaction: Transaction;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<Transaction | undefined>
  >;
};

const TransactionItem: React.FC<Props> = ({
  transaction,
  setSelectedTransaction,
}) => {
  return (
    <div
      onClick={() => setSelectedTransaction(transaction)}
      className={styles.container}
    >
      <div>
        <PaymentAmount
          amount={+transaction.amount}
          currency={transaction.currency}
          className={styles.amount}
        />
        <div className={styles.merchant}>
          <img src={transaction.merchantIconUrl} className={styles.logo} />
          <div className={styles.name}>{transaction.merchantName}</div>
        </div>
      </div>
      <div>
        <FormattedDate
          date={new Date(transaction.transactionTime)}
          className={styles.date}
        />
        <TransactionStatusChip status={transaction.status} />
      </div>
    </div>
  );
};

export default TransactionItem;
