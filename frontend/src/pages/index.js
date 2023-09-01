import React, { useEffect } from "react";
import { useRouter } from "next/router";
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
        <section id="resumate-miner">
          <h4>Resumate Miner</h4>
        </section>

        <section id="extracting-text-from-pdf">
          <h4>1. Extracting Text from PDF</h4>

          <div id="pdfminer-api">
            <h5>A. pdfminer.six API</h5>
            <p>
              We utilized the <strong>pdfminer API</strong>, a powerful tool
              designed for extracting textual information from PDF documents.
              With this API, we were able to successfully retrieve all textual
              content from a resume-based PDF document.
            </p>
          </div>

          <div id="pypdf2-api">
            <h5>B. PyPDF2 API</h5>
            <p>
              There was one drawback for this API: it was not able to parse the
              links from the document properly. To overcome that, we used{" "}
              <strong>PyPDF2 API</strong> to extract all the hyperlinks present
              within the document.
            </p>
          </div>
        </section>

        <section id="parsing-the-resume">
          <h4>2. Parsing the Resume</h4>

          <div id="extracting-name">
            <h5>A. Extracting Name</h5>
            <p>
              We have used the pre-trained English Language Model (
              <strong>'en_core_web_sm'</strong>) using the <strong>spaCy</strong>{" "}
              library to detect the name present in the resume using a custom
              pattern.
            </p>
          </div>

        </section>

        <section id="data-format">
          <h4>3. Data Format</h4>
          <p>
            We have stored the parsed resume data in the <strong>JSON Format</strong>.
            Here is the structure of our formatted data:
          </p>
        </section>

        <section id="resume-analytics">
          <h4>4. Resume Analytics</h4>

          <div id="scoring-of-resume">
            <h5>A. Scoring of Resume</h5>
            <p>
              We have done the scoring of resume based on three parameters:
            </p>
          </div>

          <div id="site-analytics">
            <h5>B. Site Analytics</h5>
            <p>
              On our website, we have displayed all the analytics separately so
              that the recruiter can compare every resume based on those scores.
            </p>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
