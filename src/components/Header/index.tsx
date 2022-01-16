import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationsNav";
import Profile from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
	const { onOpen } = useSidebarDrawer();

	const isWideVersion = useBreakpointValue({
		base: false, // base significa "default"
		lg: true, // Quero mostrar somente no tamanho large
	});

	return (
		<Flex
			as="header"
			w="100%"
			maxWidth={1480}
			h="20"
			mx="auto"
			mt="4"
			align="center"
			px="6"
		>
			{!isWideVersion && (
				<IconButton
					aria-label="Open navigation"
					icon={<Icon as={RiMenuLine} />}
					fontSize="24"
					variant="unstyled"
					onClick={onOpen}
					mr="2"
				></IconButton>
			)}

			<Logo />

			{/* Só mostra o componente SearchBox quando a tela estiver no tamanho lg, de acordo com o que foi configurado em useBreakpointValue */}
			{isWideVersion && <SearchBox />}

			<Flex align="center" ml="auto">
				<NotificationNav />

				<Profile showProfileData={isWideVersion} />
			</Flex>
		</Flex>
	);
}
