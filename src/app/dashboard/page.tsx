"use client";
import { AuthContext } from "@/components/auth-provider";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type FacebookPagePostComment = {
  id: string;
  message: string;
};

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<FacebookPagePostComment[] | null>(
    null
  );

  if (!user) {
    redirect("/");
  }

  useEffect(() => {
    FB.api(
      "207135022494137_122107452338243307/comments",
      {
        access_token:
          "EAAEp6WGFlrsBOZCXjecZAFdlxUs6ZANv2jshbJRmGt5HbSXIhFz4BVOJ9MzqOGf6M941gn5m9MuXSEwUxfFD2Fpti2rgCwpc2SOF0qXdq9eh60ZBbNMhuGBcNoqCTDAGRZC2ZCAmkeZAJVGUIFGmnkGV8M5NqzONvtgZCh0omBN0zfNsqYq96rPG4JeZAHVHIztziijapSC4ZD",
      },0
      ({ data }: { data: FacebookPagePostComment[] }) => {
        setComments(data);
      }
    );

    // FB.api(
    //   "/oauth/access_token",
    //   {
    //     client_id: "327557316974267",
    //     client_secret: "8d2494859c0e5660f96d36fe41e12128",
    //     grant_type: "client_credentials",
    //   },
    //   console.log
    // );

    FB.api(
      "/327557316974267/subscriptions",
      "post",
      {
        object: "page",
        callback_url:
          "https://logora-social-network-moderation.vercel.app/webhooks/facebook",
        verify_token: "logora",
        fields: "feed",
        access_token: "327557316974267|KupjlxNNj_2VotiOlwFLY7WvIbg",
      },
      console.log
    );

    // FB.api(
    //   "/327557316974267/subscriptions",
    //   {
    //     access_token: "327557316974267|KupjlxNNj_2VotiOlwFLY7WvIbg",
    //   },
    //   console.log
    // );
  }, []);

  const handleReject = (commentId: string) => {
    FB.api(
      `/${commentId}`,
      "delete",
      {
        access_token:
          "EAAEp6WGFlrsBOZCXjecZAFdlxUs6ZANv2jshbJRmGt5HbSXIhFz4BVOJ9MzqOGf6M941gn5m9MuXSEwUxfFD2Fpti2rgCwpc2SOF0qXdq9eh60ZBbNMhuGBcNoqCTDAGRZC2ZCAmkeZAJVGUIFGmnkGV8M5NqzONvtgZCh0omBN0zfNsqYq96rPG4JeZAHVHIztziijapSC4ZD",
      },
      (response) => {
        console.log(response);
        setComments(null);
        FB.api(
          "207135022494137_122107452338243307/comments",
          {
            access_token:
              "EAAEp6WGFlrsBOZCXjecZAFdlxUs6ZANv2jshbJRmGt5HbSXIhFz4BVOJ9MzqOGf6M941gn5m9MuXSEwUxfFD2Fpti2rgCwpc2SOF0qXdq9eh60ZBbNMhuGBcNoqCTDAGRZC2ZCAmkeZAJVGUIFGmnkGV8M5NqzONvtgZCh0omBN0zfNsqYq96rPG4JeZAHVHIztziijapSC4ZD",
          },
          ({ data }: { data: FacebookPagePostComment[] }) => {
            setComments(data);
          }
        );
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hello, {user.name}</p>

      <h1>Latest comments on your page &quot;Moderate me&quot;</h1>

      {!comments ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : comments.length === 0 ? (
        "Aucun commentaire."
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map(({ id, message }, i) => (
            <div key={i} className="card w-96 bg-base-100 shadow-xl max-w-96">
              <div className="card-body flex gap-5">
                <h2 className="card-title">{message}</h2>

                <button
                  className="btn btn-error text-white"
                  onClick={() => {
                    handleReject(id);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
