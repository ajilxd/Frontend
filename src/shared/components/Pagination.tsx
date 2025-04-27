import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

type PaginationComponentProps = {
  totalPages: number;
  currentPage: number;
  paginationHandler: (page: number) => void;
};

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
  currentPage,
  paginationHandler,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => paginationHandler(Math.max(currentPage - 1, 1))}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem
            key={page}
            {...(page === currentPage ? { isActive: "" } : {})}
            onClick={() => paginationHandler(page)}
          >
            {page}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              paginationHandler(Math.min(currentPage + 1, totalPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
