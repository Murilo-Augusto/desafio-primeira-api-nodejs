import { expect, test } from "vitest";
import supertest from "supertest";
import { app } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test("get courses", async () => {
	await app.ready();

	const { token } = await makeAuthenticatedUser("manager");

	const titleId = randomUUID();
	const course = await makeCourse(titleId);

	const response = await supertest(app.server)
		.get(`/courses?search=${titleId}`)
		.set("Authorization", token);

	expect(response.status).toEqual(200);
	expect(response.body).toEqual({
		total: 1,
		courses: [
			{
				id: course.id,
				title: titleId,
				enrollments: 0,
			},
		],
	});
});
