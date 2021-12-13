import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
	return (
		<Flex align="center">
			<Box mr="4" textAlign="right">
				<Text>Diogo Almazan</Text>
				<Text color="gray.300" fontSize="small">
					diogodpalmazan@gmail.com
				</Text>
			</Box>

			<Avatar
				md="md"
				name="Diogo Almazan"
				src="https://github.com/diogo-dpa.png"
			/>
		</Flex>
	);
}
