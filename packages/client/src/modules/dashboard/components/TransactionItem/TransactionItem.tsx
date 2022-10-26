import { Transaction } from "../../../../../../lib-common/types";
import FormattedDate from "../../../common/components/FormattedDate/FormattedDate";
import PaymentAmount from "../../../common/components/PaymentAmount/PaymentAmount";
import TransactionStatusChip from "../../../common/components/TransactionStatusChip/TransactionStatusChip";

type Props = {
  transaction?: Transaction;
  setSelectedTransaction?: React.Dispatch<
    React.SetStateAction<Transaction | undefined>
  >;
};

const TransactionItem: React.FC<Props> = ({
  transaction,
  setSelectedTransaction,
}) => {
  if (!transaction) return <li className="transactionSkeleton">Loading...</li>;

  return (
    <li
      key={transaction.id}
      onClick={
        setSelectedTransaction
          ? () => setSelectedTransaction(transaction)
          : undefined
      }
      style={{ display: "flex", columnGap: 8 }}
    >
      <PaymentAmount
        amount={+transaction.amount}
        currency={transaction.currency}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <img
          src={transaction.merchantIconUrl}
          style={{ width: 24, height: 24, borderRadius: "50%" }}
        />
        <div
          style={{
            width: 150,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          {transaction.merchantName}
        </div>
      </div>
      <FormattedDate date={new Date(transaction.transactionTime)} />
      <TransactionStatusChip status={transaction.status} />
    </li>
  );
};

export default TransactionItem;
