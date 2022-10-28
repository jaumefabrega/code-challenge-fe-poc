import cn from "classnames";

import { TransactionStatus } from "../../../../../../lib-common/types";

import styles from "./transactionStatusChip.module.scss";

type Props = {
  status: TransactionStatus;
  className?: string;
};

const TransactionStatusChip: React.FC<Props> = ({ status, className }) => {
  return (
    <div className={cn(styles.container, styles[status], className)}>
      {status.toLowerCase()}
    </div>
  );
};

export default TransactionStatusChip;
