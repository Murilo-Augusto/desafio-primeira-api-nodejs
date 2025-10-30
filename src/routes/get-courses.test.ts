import { expect, test } from "vitest";
import supertest from "supertest";
import { app } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";

test("get courses", async () => {
	await app.ready();

	const titleId = randomUUID();
	const course = await makeCourse(titleId);

	const response = await supertest(app.server).get(
		`/courses?search=${titleId}`
	);

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

test("return 404 for non existing courses", async () => {
	await app.ready();

	const response = await supertest(app.server).get(
		"/courses/779d290d-13e0-4995-8a0e-a436cedfb2b0"
	);

	expect(response.status).toEqual(404);
});
