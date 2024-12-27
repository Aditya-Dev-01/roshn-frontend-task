import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { Table, Box, Flex, Text } from '@radix-ui/themes';

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const navigate = useNavigate();

  const handleRowClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Contact</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Company</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row
            key={user.id}
            onClick={() => handleRowClick(user.id)}
            className="cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-sm border-b border-gray-100 last:border-none"
          >
            <Table.Cell >
              <Flex align="center" gap="3">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {user.name}
                  </Text>
                </Box>
              </Flex>
            </Table.Cell>
            <Table.Cell>
              <Text size="2">@{user.username}</Text>
            </Table.Cell>
            <Table.Cell>
              <Box>
                <Text as="div" size="2" color="blue">
                  {user.email}
                </Text>
                <Text as="div" size="1" color="gray">
                  {user.phone}
                </Text>
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Box>
                <Text as="div" size="2">
                  {user.company.name}
                </Text>
                <Text as="div" size="1" color="gray">
                  {user.company.catchPhrase}
                </Text>
              </Box>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UserTable;
