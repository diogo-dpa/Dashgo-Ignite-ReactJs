import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { queryClient } from "../services/queryClient";

// Variável padrão do Next para identificar o ambiente
// Caso seja dev, rodar o MirageJs
if (process.env.NODE_ENV === "development") {
	makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
	// A propriedade resetCSS reseta os estilos padrões do HTML
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<SidebarDrawerProvider>
					<Component {...pageProps} />
				</SidebarDrawerProvider>
			</ChakraProvider>

			{/* Precisa estar dentro do QueryClientProvider */}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default MyApp;
