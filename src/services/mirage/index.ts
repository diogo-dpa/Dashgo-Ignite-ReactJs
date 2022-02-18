import { createServer, Factory, Model } from "miragejs";
// Dados ficticios
import faker from "faker";

type User = {
	nmae: string;
	emai: string;
	created_at: string;
};

export function makeServer() {
	const server = createServer({
		// Quais dados quero armazenar no banco de dados ficticio
		models: {
			// O Partial especifica que pode conter todos, ou não, campos de User
			user: Model.extend<Partial<User>>({}),
		},
		// Gerar dados em massa
		factories: {
			// Model com seus respectivos atributos
			user: Factory.extend({
				name(index: number) {
					return `User ${index}`;
				},
				email() {
					return faker.internet.email().toLowerCase();
				},
				createdAt() {
					return faker.date.recent(10, new Date());
				},
			}),
		},
		seeds(server) {
			// Qual model quero criar e sua quantidade
			server.createList("user", 10);
		},
		// Rotas da aplicação
		routes() {
			// URL base da Rota
			this.namespace = "api";

			// Tempo de delay da rota
			this.timing = 750;

			// Shorthands para CRUD
			this.get("/users");
			this.post("/users");

			// Reseta para não prejudicar as rotas
			this.namespace = "";
			// Faz com que todas as rotas passem pelo Mirage
			// Caso não encontre, passa a adiante
			this.passthrough();
		},
	});

	return server;
}
