import { notFound } from "next/navigation";
import { UserProfileShell } from "./UserProfileShell";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId: userIdParam } = await params;
  const userId = Number(userIdParam);
  if (!Number.isFinite(userId) || userId <= 0) {
    notFound();
  }

  return <UserProfileShell userId={userId} />;
}

