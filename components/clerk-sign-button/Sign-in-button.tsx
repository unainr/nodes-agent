"use client";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

export const SignInButtonClerk = () => {


  return (
    <>
      <Show when="signed-out">
        <SignInButton>
          <Button variant={"primary"}>Get Started</Button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
        <Button variant={"primary"} className="rounded-none" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </Show>
    </>
  );
};