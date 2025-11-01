import { expect, test } from "vitest";
import supertest from "supertest";

import { app } from "../app.ts";
import { makeUser } from "../tests/factories/make-user.ts";

test("login", async () => {
	await app.ready();

	const { user, passwordBeforeHash } = await makeUser();

	const response = await supertest(app.server)
		.post("/sessions")
		.set("Content-Type", "application/json")
		.send({
			email: user.email,
			password: passwordBeforeHash,
		});

	expect(response.status).toEqual(200);
	expect(response.body).toEqual({
		token: expect.any(String),
	});
});
