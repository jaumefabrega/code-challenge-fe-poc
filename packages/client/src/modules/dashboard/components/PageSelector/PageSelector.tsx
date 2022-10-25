import { Pagination } from "../TransactionsList/TransactionsList";

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
  const pageElements = pages
    ? Array(pages)
        .fill(undefined)
        .map((_, idx) => (
          <div
            onClick={() => setCurrentPage(idx)}
            style={{ color: idx === currentPage ? "red" : "black" }}
            key={idx}
          >
            {idx + 1}
          </div>
        ))
    : null;

  return (
    <div style={{ display: "flex", gap: 8 }}>
      Pages:
      {pageElements}
    </div>
  );
};

export default PageSelector;
