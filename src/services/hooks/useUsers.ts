import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
	id: string;
	name: string;
	email: string;
	createdAt: string;
};

type GetUsersResponse = {
	totalCount: number;
	users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
	const { data, headers } = await api.get("users", {
		params: {
			page,
		},
	});

	const totalCount = Number(headers["x-total-count"]);

	const users = data.users.map((user) => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		};
	});
	return {
		users,
		totalCount,
	};
}

export function useUsers(page: number, options: UseQueryOptions) {
	// Sempre que eu tiver um informação que ela vai mudar o dado no Reacy Query,
	// deve ser adicionada à chave do cache
	// No caso, foi a pagina
	return useQuery(["users", page], () => getUsers(page), {
		staleTime: 1000 * 60 * 10, // 10 min
		...options,
	});
}
