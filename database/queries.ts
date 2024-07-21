import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "@/database/schema";
import { auth } from "@clerk/nextjs/server";

export const getCourses = cache( async () => {
    const data = await db.query.courses.findMany();
    return data;
});

export const getUserProgress = cache( async () => {
    const { userId } = await auth();

    if(!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

export const getCourseById = cache( async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        // TODO populate unit and lessons
    });

    return data;
});

