"use client";
import { AuthContext } from "@/components/auth-provider";
import { User } from "@/types/user";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { user, setUser } = useContext(AuthContext);

  if (user) {
    redirect("/dashboard");
  }

  const handleLogin = () => {
    FB.login(
      (response) => {
        console.log(response);

        FB.api("/me", (user: User) => {
          console.log(user);
          setUser(user);
        });
      },
      {
        scope:
          "manage_pages,pages_read_engagement,pages_read_user_content,pages_manage_metadata,pages_show_list",
      }
    );
  };

  useEffect(() => {
    FB.init({
      appId: "3733333870253662",
      version: "v19.0",
      xfbml: true,
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Logora Social Network POC</h1>

      <button className="btn btn-primary" onClick={handleLogin}>
        Login with Facebook
      </button>
    </main>
  );
}
