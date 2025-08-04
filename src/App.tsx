"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";


export default function App() {
  return (
    <>
      <header>
        Tier3 Zeitzeug
        <UserButton />
      </header>
      <main>
        <Authenticated>
          <ProtectedContent />
          <PublicContent />
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
          <PublicContent />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInForm() {
  return (
    <div>
      <p>Log in to see the numbers</p>
      <SignInButton mode="modal">
        <button >
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button>
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}
function PublicContent() {
  return (
    <section>
      <p>Public Content</p>
    </section>
  );
}


function ProtectedContent() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  return (
    <section>
      <p>Welcome {viewer ?? "Anonymous"}!</p>
      <p>
        <button
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}
      </p>
    </section>
  );
}

