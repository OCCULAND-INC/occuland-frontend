import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useState } from 'react';

import Button from '../Button/Button';

interface PageButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

function PrevButton({ onClick, disabled }: PageButtonProps) {
  return (
    <li>
      <Button
        onClick={onClick}
        disabled={disabled}
        className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg "
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="w-5 h-5" />
      </Button>
    </li>
  );
}

function NextButton({ onClick, disabled }: PageButtonProps) {
  return (
    <li>
      <Button
        onClick={onClick}
        disabled={disabled}
        className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg "
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="w-5 h-5" />
      </Button>
    </li>
  );
}

interface PageItemProps {
  className?: string;
  isCurrent: boolean;
  onClick: () => void;
  pageNumber: number;
}

function PageItem({
  pageNumber,
  className,
  isCurrent,
  onClick,
}: PageItemProps) {
  const activeStyle =
    'z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 ';
  const normalStyle =
    'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';

  return (
    <li className={className}>
      <Button
        className={isCurrent ? activeStyle : normalStyle}
        aria-current={isCurrent ? 'page' : 'false'}
        onClick={onClick}
      >
        {pageNumber}
      </Button>
    </li>
  );
}

interface PagainationProps {
  initialPage?: number;
  itemPerPage: number;
  onPageChange: (page: number) => void;
  totalNumber: number;
}

function Pagination({
  onPageChange,
  totalNumber,
  itemPerPage,
  initialPage = 0,
}: PagainationProps) {
  const totalPage = Math.ceil(totalNumber / itemPerPage);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handlePageChange = (value: number) => () => {
    setCurrentPage(value);
    onPageChange(value);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <PrevButton
          onClick={handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        />
        {Array(totalPage)
          .fill(0)
          .map((_, index) => (
            <PageItem
              key={index}
              pageNumber={index + 1}
              isCurrent={index === currentPage}
              onClick={handlePageChange(index)}
            />
          ))}
        <NextButton
          onClick={handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage - 1}
        />
      </ul>
    </nav>
  );
}

export default Pagination;
