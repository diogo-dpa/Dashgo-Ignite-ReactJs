import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
	name: yup.string().required("Nome obrigatório"),
	email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
	password: yup
		.string()
		.required("Senha obrigatória")
		.min(6, "No mínimo 6 caracteres"),
	password_confirmation: yup
		.string()
		.oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"), // pode ser vazio (nulo) ou igual ao campo password. 2º parâmetro é a mensagem de validação
});

export default function CreateUser() {
	const router = useRouter();

	// Assim como no useQuery, conseguiremos monitorar o estado dessa chamada

	// Quando a gente cadastra uma nova informação é muito importante que limpemos o cache das paginas
	// pois, caso não, os dados em tela serão mostrados de acordo com o cache armazenados
	const createUser = useMutation(
		async (user: CreateUserFormData) => {
			const response = await api.post("users", {
				user: {
					...user,
					created_at: new Date(),
				},
			});

			// Retorna o usuario cadastrado
			return response.data.user;
		},
		{
			// Quando der sucesso na requisição, quero invalidar o cache para atualizá-lo
			onSuccess: () => {
				queryClient.invalidateQueries("users"); // no caso, vai invalidar somente a 1ª pagina de usuários
			},
		}
	);

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(createUserFormSchema),
	});

	const { errors } = formState;

	const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
		// Utilização da Mutation
		await createUser.mutateAsync(data);
		router.push("/users");
	};

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
				<Sidebar />

				<Box
					as="form"
					flex="1"
					borderRadius={8}
					bg="gray.800"
					p={["6", "8"]}
					onSubmit={handleSubmit(handleCreateUser)}
				>
					<Heading size="lg" fontWeight="normal">
						Criar usuário
					</Heading>

					<Divider my="6" borderColor="gray.700" />

					<VStack spacing="8">
						<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
							<Input
								name="name"
								label="Nome Completo"
								error={errors.name}
								{...register("name")}
							/>
							<Input
								name="email"
								label="E-mail"
								type="email"
								error={errors.email}
								{...register("email")}
							/>
						</SimpleGrid>
						<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
							<Input
								name="password"
								label="Confirmação da senha"
								type="password"
								error={errors.password}
								{...register("password")}
							/>
							<Input
								name="password_confirmation"
								label="Senha"
								type="password"
								error={errors.password_confirmation}
								{...register("password_confirmation")}
							/>
						</SimpleGrid>
					</VStack>

					<Flex mt="8" justify="flex-end">
						<HStack spacing="4">
							<Link href="/users" passHref>
								{/* Pela propriedade "as" especificamos o que o componente pode ser. No caso, o Button será um "a" */}
								<Button as="a" colorScheme="whiteAlpha">
									Cancelar
								</Button>
							</Link>
							<Button
								type="submit"
								colorScheme="pink"
								isLoading={formState.isSubmitting}
							>
								Salvar
							</Button>
						</HStack>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
}
