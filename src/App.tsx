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

        <p>Useful resources:</p>
        
          <div>
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing
            collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
            />
          </div>
          <div>
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
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
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
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
      <p>
        Edit{" "}
        <code>
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code>
          src/App.tsx
        </code>{" "}
        to change your frontend
      </p>
    </section>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div>
      <a href={href}>
        {title}
      </a>
      <p>{description}</p>
    </div>
  );
}
