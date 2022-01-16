import { Text } from "@chakra-ui/react";
import Link from "next/link";

export function Logo() {
	// Com o Chakra se consegue personalizar o tamanho da propriedade de acordo com os breakpoints.
	// No caso, o fontSize seria "2xl" para resolução "sm"(small) e a partir daí "3xl"
	return (
		<Link href="/dashboard" passHref>
			<Text
				fontSize={["2xl", "3xl"]}
				fontWeight="bold"
				letterSpacing="tight"
				w="64"
				cursor="pointer"
			>
				dashgo
				<Text as="span" ml="1" color="pink.500">
					.
				</Text>
			</Text>
		</Link>
	);
}
