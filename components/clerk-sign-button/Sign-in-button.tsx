"use client";
import { Show, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

export const SignInButtonClerk = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;

  return (
    <>
      <Show when="signed-out">
        <SignInButton>
          <Button variant={"primary"}>Get Started</Button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
        {role === "admin" ? (
          <Button variant={"primary"} className="rounded-none" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <Button variant={"primary"} className="rounded-none" asChild>
            <Link href="/orders">My Orders</Link>
          </Button>
        )}
      </Show>
    </>
  );
};