import { TransactionStatus } from "../../../../../../lib-common/types";

type Props = {
  status: TransactionStatus;
  className?: string;
};

const TransactionStatusChip: React.FC<Props> = ({ status, className }) => {
  return (
    <div className={className} style={{ textTransform: "capitalize" }}>
      {status.toLowerCase()}
    </div>
  );
};

export default TransactionStatusChip;
