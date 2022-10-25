import { Transaction } from "../../../../../../lib-common/types";

type Props = {
  transaction?: Transaction;
};

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  if (!transaction) return <li className="transactionSkeleton">Loading...</li>;

  return (
    <li key={transaction.id} style={{ display: "flex", columnGap: 8 }}>
      <img
        src={transaction.merchantIconUrl}
        style={{ width: 16, height: 16 }}
      />
      <div style={{ width: 120 }}>{transaction.merchantName}</div>
      <div>{transaction.transactionTime}</div>
      <div>
        {transaction.amount} {transaction.currency}
      </div>
    </li>
  );
};

export default TransactionItem;
