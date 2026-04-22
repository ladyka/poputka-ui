import SignIn from "@/app/sign-in/SignIn";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const nextParam = sp?.next;
  const next = Array.isArray(nextParam) ? nextParam[0] : nextParam;
  return (
    <SignIn next={next}/>
  );
}
