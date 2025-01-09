import { getLesson, getUserProgress } from "@/database/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";


const LessonPage = async () => {
 const lessonData = getLesson();
 const userProgressData = getUserProgress();

 const [
  lesson,
  userProgress,
 ] = await Promise.all([
  lessonData,
  userProgressData
 ]);

 if(!lesson || !userProgress) {
    redirect("/learn");
 }

 const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed)
 .length / lesson.challenges.length * 100;

  return (
    <Quiz 
        intitalLessonId={lesson.id}
        initialHearts={userProgress.hearts}
        intitalLessonChallenges={lesson.challenges}
        initialPercentage={initialPercentage}
        userSubscription={null}
    />
  )
}

export default LessonPage;