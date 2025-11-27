import AppLayout from "@/components/layout/AppLayout";
import EditCourse from "../../../../../../components/courses/EditCourse";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppLayout>
      <EditCourse courseId={id} />
    </AppLayout>
  );
}
