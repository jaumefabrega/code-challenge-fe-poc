import cn from "classnames";

import styles from "./pageSelector.module.scss";

type Props = {
  perPage: number;
  offset: number;
  total: number;
  setCurrentPage: (p: number) => void;
};

// I did not implement the ellipsis (eg "1 2 3 ... 40 41 42") functionality
const PageSelector: React.FC<Props> = ({
  perPage,
  offset,
  total,
  setCurrentPage,
}) => {
  const pages = Math.ceil(total / perPage);
  const currentPage = Math.floor(offset / perPage);
  if (!pages) return null;

  const pagesArray = Array(pages).fill(undefined);

  const pageElements = pagesArray.map((_, idx) => (
    <div
      onClick={
        idx === currentPage
          ? undefined
          : () => {
              setCurrentPage(idx);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
      }
      className={cn(styles.page, {
        [styles.current]: idx === currentPage,
      })}
      key={idx}
    >
      {idx + 1}
    </div>
  ));

  return <div className={styles.container}>{pageElements}</div>;
};

export default PageSelector;
