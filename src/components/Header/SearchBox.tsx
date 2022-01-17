import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
	// Vamos armazenar uma ref do tipo HTMLInputElement
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Para acessar o valor da ref, basta acessar ref.current.value
	//console.log(searchInputRef.current.value)
	// Caso quisermos dar foco no input, tambem utiliza-se o ref
	//searchInputRef.current.focus() => Imperativa
	// Declarativa é quando só declaramos uma ação e não sabemos como será, porem será executada

	return (
		<Flex
			as="label"
			flex="1"
			py="4"
			px="8"
			ml="6"
			maxWidth={400}
			alignSelf="center"
			color="gray.200"
			position="relative"
			bg="gray.800"
			borderRadius="full"
		>
			<Input
				color="gray.500"
				variant="unstyled"
				px="4"
				mr="4"
				placeholder="Buscar na plataforma"
				_placeholder={{ color: "gray.400" }} // estilização relativa ao placeholder
				ref={searchInputRef}
			/>
			<Icon as={RiSearchLine} fontSize="20" />
		</Flex>
	);
}
