import {
	Box,
	Button,
	Checkbox,
	Flex,
	Heading,
	Icon,
	Link,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useBreakpointValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import Pagination from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList({ users }) {
	const [page, setPage] = useState(1);
	// 1º - Chave do cash
	// Os dados ficarão no cash no front
	// 2ª função que vai retornar os dados
	const { data, isLoading, isFetching, error } = useUsers(page, {
		initialData: users,
	});

	// Só vai mostrar a partir do tamanho lg
	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true,
	});

	const handlePrefetchUser = async (userId: string) => {
		// Precisa passar a mesma chave que quer realizar o prefetch e qual é a função
		await queryClient.prefetchQuery(
			["user", userId],
			async () => {
				const response = await api.get(`users/${userId}`);
				return response.data;
			},
			{
				staleTime: 1000 * 60 * 10, // 10 min
			}
		);
	};

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
				<Sidebar />

				<Box flex="1" borderRadius={8} bg="gray.800" p="8">
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Usuários
							{
								// Não acontecerá no 1º loading, mas sim no Refetching
								!isLoading && isFetching && (
									<Spinner size="sm" color="gray.500" ml="4" />
								)
							}
						</Heading>

						<NextLink href="/users/create" passHref>
							<Button
								as="a"
								size="sm"
								fontSize="sm"
								colorScheme="pink"
								leftIcon={<Icon as={RiAddLine} fontSize="20" />}
							>
								Criar novo usuário
							</Button>
						</NextLink>
					</Flex>

					{isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center">
							<Text>Falha ao obter os dados do usuário.</Text>
						</Flex>
					) : (
						<>
							<Table colorScheme="whiteAlpha">
								<Thead>
									<Tr>
										<Th px={["4", "4", "6"]} color="gray.300" width="8">
											<Checkbox colorScheme="pink" />
										</Th>

										<Th>Usuário</Th>
										{isWideVersion && <Th>Data de cadastro</Th>}
										<Th w="8"></Th>
									</Tr>
								</Thead>
								<Tbody>
									{data.users.map((user) => {
										return (
											<Tr key={user.id}>
												{/* sm: 4, md: 4, lg:6 */}
												<Td px={["4", "4", "6"]}>
													<Checkbox colorScheme="pink" />
												</Td>
												<Td>
													<Box>
														<Link
															color="purple.400"
															onMouseEnter={() => handlePrefetchUser(user.id)}
														>
															<Text fontWeight="bold">{user.name}</Text>
														</Link>
														<Text fontSize="sm" color="gray.300">
															{user.email}
														</Text>
													</Box>
												</Td>
												{isWideVersion && <Td>{user.createdAt}</Td>}
												<Td>
													<Button
														as="a"
														size="sm"
														fontSize="sm"
														colorScheme="purple"
														leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
													>
														{isWideVersion ? "Editar" : ""}
													</Button>
												</Td>
											</Tr>
										);
									})}
								</Tbody>
							</Table>

							<Pagination
								totalCountOfRegisters={data.totalCount}
								currentPage={page}
								onPageChange={setPage}
							/>
						</>
					)}
				</Box>
			</Flex>
		</Box>
	);
}

// Demonstração de Renderização pelo lado do Servidor
export const getServerSideProps: GetServerSideProps = async () => {
	const { users, totalCount } = await getUsers(1);

	return {
		props: {
			users,
			totalCount,
		},
	};
};
