import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	shouldMatchExactHref?: boolean;
}

// ReactElement precisa ser um componente React
// ReactNode é mais geral, podendo receber texto, numero ou elemento react

export function ActiveLink({
	children,
	shouldMatchExactHref = false,
	...rest
}: ActiveLinkProps) {
	let isActive = false;
	// asPath é a rota ativa no momento
	const { asPath } = useRouter();

	if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
		isActive = true;
	}

	if (
		!shouldMatchExactHref &&
		(asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
	) {
		isActive = true;
	}

	return (
		<Link {...rest}>
			{cloneElement(children, {
				color: isActive ? "pink.400" : "gray.500",
			})}
		</Link>
	);
}
