import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUserList, setCurrentPage } from '../../store/userSlice';
import { UserTable } from '../../components/Table/Table';
import { Pagination } from '../../components/Pagination/Pagination';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Heading, Box, Card, Flex, Text } from '@radix-ui/themes';

export const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUserList(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleRetry = () => {
    dispatch(fetchUserList(currentPage));
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" className="min-h-[400px]">
        <Card size="2">
          <Text size="2">Loading users...</Text>
        </Card>
      </Flex>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <Box>
      <Card size="2" style={{ marginBottom: "10px" }}>
        <Flex direction="column" gap="4">
          <Heading size="6" align="center">User Management Dashboard</Heading>
          <Text align="center" color="gray" size="2">
            View and manage all users in the system
          </Text>
        </Flex>
      </Card>

      <Card size="2" className="mt-6">
        <UserTable users={users} />
      </Card>

      <Box mt="4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};
