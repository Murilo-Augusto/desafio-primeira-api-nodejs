import { expect, test } from "vitest";
import supertest from "supertest";
import { app } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";

test("get course by id", async () => {
	await app.ready();

	const course = await makeCourse();

	const response = await supertest(app.server).get(`/courses/${course.id}`);

	expect(response.status).toEqual(200);
	expect(response.body).toEqual({
		course: {
			id: expect.any(String),
			title: expect.any(String),
			description: null,
		},
	});
});
