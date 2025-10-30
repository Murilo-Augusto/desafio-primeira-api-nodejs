import fastify from "fastify";
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { createCourseRoute } from "./routes/create-course.ts";
import { getCoursesRoute } from "./routes/get-courses.ts";
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts";
import scalarAPIReference from "@scalar/fastify-api-reference";

export const app = fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MMss Z",
				ignore: "pid,hostname",
			},
		},
	},
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Desafio Node.js",
				version: "1.0.0",
			},
		},
		transform: jsonSchemaTransform,
	});

	app.register(scalarAPIReference, {
		routePrefix: "/docs",
		configuration: {
			theme: "elysiajs",
		},
	});
}

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getCoursesRoute);
app.register(createCourseRoute);
app.register(getCourseByIdRoute);
