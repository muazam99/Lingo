"use client";

import { challengeOptions, challenges } from "@/database/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {
    initialPercentage: number;
    intitalLessonId: number;
    initialHearts: number;
    intitalLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
};

export const Quiz = ({
    initialPercentage,
    intitalLessonId,
    initialHearts,
    intitalLessonChallenges,
    userSubscription
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
        </>
    );
}