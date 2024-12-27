import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUserDetails, clearSelectedUser } from '../../store/userSlice';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import {
  Card,
  Heading,
  Text,
  Flex,
  Box,
  Grid,
  Button,
  Avatar,
  Container,
  Separator
} from '@radix-ui/themes';
import {
  ArrowLeftIcon,
  GlobeIcon,
} from '@radix-ui/react-icons';
import { FaBuilding } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiContactsFill } from "react-icons/ri";

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails(parseInt(id)));
    }
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, id]);

  const handleRetry = () => {
    if (id) {
      dispatch(fetchUserDetails(parseInt(id)));
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" className="min-h-[400px]">
        <Card size="2">
          <Text size="2">Loading user details...</Text>
        </Card>
      </Flex>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!selectedUser) {
    return null;
  }

  return (
    <Container size="3" className="py-8">
      <Flex direction="column" gap="4">
        <Button
          variant="soft"
          onClick={() => navigate('/')}
          className="w-fit"
        >
          <ArrowLeftIcon /> Back to List
        </Button>

        <Card size="2" className="p-6">
          <Flex direction="column" gap="6">
            {/* Header Section */}
            <Flex align="center" gap="4">
              <Avatar
                size="5"
                radius="full"
                fallback={selectedUser.name[0]}
                className="bg-blue-100 text-blue-600"
              />
              <Box>
                <Heading size="6">{selectedUser.name}</Heading>
                <Text size="2" color="gray">@{selectedUser.username}</Text>
              </Box>
            </Flex>

            <Separator size="4" />

            <Grid columns="2" gap="6">
              {/* Contact Information */}
              <Card className="p-4">
                <Flex direction="column" gap="3">
                  <Heading size="3" className="flex items-center gap-2">
                    <RiContactsFill /> Contact Information
                  </Heading>
                  <Box>
                    <Text as="div" size="2" weight="bold" color="gray">Email</Text>
                    <Text as="div" size="2" className="text-blue-600">{selectedUser.email}</Text>
                  </Box>
                  <Box>
                    <Text as="div" size="2" weight="bold" color="gray">Phone</Text>
                    <Text as="div" size="2">{selectedUser.phone}</Text>
                  </Box>
                  <Flex align="center" gap="2">
                    <GlobeIcon />
                    <Text as="div" size="2">{selectedUser.website}</Text>
                  </Flex>
                </Flex>
              </Card>

              {/* Company Information */}
              <Card className="p-4">
                <Flex direction="column" gap="3">
                  <Heading size="3" className="flex items-center gap-2">
                    <FaBuilding /> Company Details
                  </Heading>
                  <Box>
                    <Text as="div" size="2" weight="bold">{selectedUser.company.name}</Text>
                    <Text as="div" size="2" color="gray">{selectedUser.company.catchPhrase}</Text>
                    <Text as="div" size="2" color="gray">{selectedUser.company.bs}</Text>
                  </Box>
                </Flex>
              </Card>
            </Grid>

            {/* Address Section */}
            <Card className="p-4">
              <Flex direction="column" gap="3">
                <Heading size="3" className="flex items-center gap-2">
                  <IoHome /> Address
                </Heading>
                <Box>
                  <Text as="div" size="2">
                    {selectedUser.address.street}, {selectedUser.address.suite}
                  </Text>
                  <Text as="div" size="2">
                    {selectedUser.address.city}, {selectedUser.address.zipcode}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
};
