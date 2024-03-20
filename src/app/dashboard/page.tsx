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
      },
      ({ data }: { data: FacebookPagePostComment[] }) => {
        setComments(data);
      }
    );
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
