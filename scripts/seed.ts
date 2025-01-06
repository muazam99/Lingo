import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../database/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try{
        console.log("Seeding the database...");
        
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg"
            },
            {
                id: 2,
                title: "Italian",
                imageSrc: "/it.svg"
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg"
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/hr.svg"
            },
            {
                id: 5,
                title: "Japanese",
                imageSrc: "/jp.svg"
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                courseId: 1,
                order: 1
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                title: "Nouns",
                order: 1,
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is the "the man"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/man.svg",
                text: "el hombre",
                correct: true,
                audioSrc: "/es_man.mp3"
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/woman.svg",
                text: "la mujer",
                correct: false,
                audioSrc: "/es_woman.mp3"
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                text: "el robot",
                correct: false,
                audioSrc: "/es_robot.mp3"
            },
        ]);

        console.log("Seeding Finished");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to seed the databse");
    }
};

main();