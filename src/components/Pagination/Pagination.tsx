import { Flex, Button, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Flex align="center" justify="center" gap="2">
      <Button 
        variant="soft" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>
      
      <Text size="2">
        Page {currentPage} of {totalPages}
      </Text>
      
      <Button 
        variant="soft" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};
