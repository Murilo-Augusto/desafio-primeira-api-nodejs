import { expect, test } from "vitest";
import supertest from "supertest";
import { app } from "../app.ts";
import { faker } from "@faker-js/faker";

test("create a course", async () => {
	await app.ready();

	const response = await supertest(app.server)
		.post("/courses")
		.set("Content-Type", "application/json")
		.send({ title: faker.lorem.words(4) });

	expect(response.status).toEqual(201);
	expect(response.body).toEqual({
		courseId: expect.any(String),
	});
});
