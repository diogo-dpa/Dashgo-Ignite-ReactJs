import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
	children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
	children,
}: SidebarDrawerProviderProps) {
	// o useDisclosure é um hook do ChakraUi que já cuida das partes necessárias para fechar e abrir o Header
	const disclosure = useDisclosure();
	const router = useRouter();

	useEffect(() => {
		disclosure.onClose();

		// Toda vez que a rota mudar, fecha a SideBar
	}, [router.asPath]);

	return (
		<SidebarDrawerContext.Provider value={disclosure}>
			{children}
		</SidebarDrawerContext.Provider>
	);
}

// Criamos um hook
export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
