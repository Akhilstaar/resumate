import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <DefaultLayout title="Homepage | Resumate" content="">
      <div className="p-4 bg-white rounded-3">
        <p>
          A small project made from hall-2 for inter hall competition, takneek
        </p>
        <h1 className="display-5 mb-4">About the Model used</h1>
        <p>
          Sit ut labore ipsum consequat consectetur in eu ut non est Lorem ad anim. Consequat cillum quis aliquip duis culpa aute elit amet cupidatat officia. Excepteur deserunt amet qui nostrud cillum anim ex nisi sint ex exercitation eiusmod. In eiusmod fugiat consectetur Lorem sunt cillum excepteur aliquip ullamco aute.
        </p>
      </div>
    </DefaultLayout>
  );
}
