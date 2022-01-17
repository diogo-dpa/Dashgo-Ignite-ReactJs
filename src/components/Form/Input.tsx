import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input as ChakraInput,
	InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
	name: string;
	label?: string;
	error?: FieldError;
}

export const InputBase: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = ({ name, label, error = null, ...rest }: InputProps, ref) => {
	return (
		<FormControl isInvalid={!!error}>
			{!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<ChakraInput
				name={name}
				id={name}
				focusBorderColor="pink.500"
				bgColor="gray.900"
				variant="filled"
				_hover={{
					bgColor: "gray.900",
				}}
				size="lg"
				{...rest}
				ref={ref}
			/>

			{!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
};

// Utilizamos a função forwardRef para encaminhar a ref passada do componente de fora para o de dentro
// e tipamos a mesma no código acima
export const Input = forwardRef(InputBase);
