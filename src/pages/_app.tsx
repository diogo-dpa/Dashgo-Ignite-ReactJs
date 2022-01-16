import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";

function MyApp({ Component, pageProps }: AppProps) {
	// A propriedade resetCSS reseta os estilos padrões do HTML
	return (
		<ChakraProvider theme={theme}>
			<SidebarDrawerProvider>
				<Component {...pageProps} />
			</SidebarDrawerProvider>
		</ChakraProvider>
	);
}

export default MyApp;
