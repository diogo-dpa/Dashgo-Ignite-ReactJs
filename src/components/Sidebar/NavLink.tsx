import {
	Icon,
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
	Text,
} from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
	// extende configurações do link, tipo estilizações adicionais
	icon: ElementType; // Referente ao nome do componente
	children: string;
	href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
	return (
		// passHref passa a propriedade href para o componente interno
		// o efeito é aparecer embaixo na tela o caminho de onde o link se refere
		<ActiveLink href={href} passHref>
			<ChakraLink display="flex" align="center" {...rest}>
				<Icon as={icon} fontSize="20" />
				<Text ml="4" fontWeight="medium">
					{children}
				</Text>
			</ChakraLink>
		</ActiveLink>
	);
}
