import SignIn from "@/app/sign-in/SignIn";

export const dynamic = "force-dynamic";

export default function Home({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const nextParam = searchParams?.next;
  const next = Array.isArray(nextParam) ? nextParam[0] : nextParam;
  return (
    <SignIn next={next}/>
  );
}
