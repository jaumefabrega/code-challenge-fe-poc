import { Skeleton } from "@mantine/core";
import cn from "classnames";

import styles from "./transactionItem.module.scss";

const TransactionItemSkeleton: React.FC = ({}) => {
  return (
    <div className={cn(styles.container, styles.skeleton)}>
      <div className={styles.left}>
        <Skeleton
          width={80}
          height={24}
          animate={false}
          className={styles.amount}
        />
        <div className={styles.merchant}>
          <Skeleton circle height={24} />
          <Skeleton width={120} height={24} />
        </div>
      </div>
      <div>
        <div></div>
        <Skeleton width={80} height={24} animate={false} radius={10} />
      </div>
    </div>
  );
};

export default TransactionItemSkeleton;
