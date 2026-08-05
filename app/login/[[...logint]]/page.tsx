import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff9fc] via-[#f7e6f5] to-[#ead8f7] px-4">
      <SignIn
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:opacity-90 text-white",
            card: "shadow-xl",
            footerAction__signIn: { display: "none" },
            footerAction: { display: "none" },
            footer: { display: "none" },
          },
        }}
      />
    </div>
  );
}