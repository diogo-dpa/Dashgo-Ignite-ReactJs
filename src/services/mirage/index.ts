import {
	createServer,
	Factory,
	Model,
	Response,
	ActiveModelSerializer,
} from "miragejs";
// Dados ficticios
import faker from "faker";

type User = {
	nmae: string;
	emai: string;
	created_at: string;
};

export function makeServer() {
	const server = createServer({
		// o Serializer indica ao Mirage como interpretar os dados enviados a ele
		serializers: {
			application: ActiveModelSerializer, // isso permite trabalhar com relacionamentos nos models
		},
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
			server.createList("user", 200);
		},
		// Rotas da aplicação
		routes() {
			// URL base da Rota
			this.namespace = "api";

			// Tempo de delay da rota
			this.timing = 750;

			// Shorthands para CRUD
			this.get("/users", function (schema, request) {
				const { page = 1, per_page = 10 } = request.queryParams;

				// Pega todos os dados de um model, no caso os 200 registros
				const total = schema.all("user").length;

				const pageStart = (Number(page) - 1) * Number(per_page);
				const pageEnd = pageStart + Number(per_page);

				const users = this.serialize(schema.all("user"))
					.users.sort((a, b) => a.created_at - b.created_at)
					.slice(pageStart, pageEnd);
				// será necessário serializar o resultado para que o Mirage tenha controle dos dados

				// Retornaremos um Headers com algumas informações importantes, não sendo necessariamente o body
				// Essas informações são chamadas de Metadados
				return new Response(
					200, // statusCode
					{
						"x-total-count": String(total), // o padrão para enviar o número de registros é dessa forma
					},
					{
						users,
					}
				);
			});

			this.get("/users:id");
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
