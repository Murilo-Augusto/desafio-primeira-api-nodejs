import { expect, test } from "vitest";
import supertest from "supertest";
import { app } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test("create a course", async () => {
	await app.ready();

	const { token } = await makeAuthenticatedUser("manager");

	const response = await supertest(app.server)
		.post("/courses")
		.set("Content-Type", "application/json")
		.set("Authorization", token)
		.send({ title: faker.lorem.words(4) });

	expect(response.status).toEqual(201);
	expect(response.body).toEqual({
		courseId: expect.any(String),
	});
});
