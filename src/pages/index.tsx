import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";

type SignInFormData = {
	email: string;
	password: string;
};

const signInFormSchema = yup.object().shape({
	email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
	password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
	// O formState avalia o estado do form
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(signInFormSchema),
	});

	const { errors } = formState;

	// O SubmitHandler recebe como 2º parâmetro o evento do formulário
	const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log("dados", data);
	};

	return (
		<Flex w="100vw" h="100vh" align="center" justify="center">
			<Flex
				as="form"
				width="100%"
				maxW={360}
				bg="gray.800"
				p="8" // Verificar esse valor na tabela do Chakra UI
				borderRadius={8}
				flexDir="column"
				onSubmit={handleSubmit(handleSignIn)} // passa para o handleSubmit a função que lidará com os valores dos inputs
			>
				<Stack spacing="4">
					<Input
						name="email"
						label="E-mail"
						type="email"
						error={errors.email}
						{...register("email")} // nova forma de passar o register para dentro do input
					/>
					<Input
						name="password"
						label="Senha"
						type="password"
						error={errors.password}
						{...register("password")}
					/>
				</Stack>

				{/* Margin Top de 6 unidades, correspondendo a 24px */}
				<Button
					type="submit"
					marginTop="6"
					colorScheme="pink"
					size="lg"
					isLoading={formState.isSubmitting}
				>
					Entrar
				</Button>
			</Flex>
		</Flex>
	);
}
