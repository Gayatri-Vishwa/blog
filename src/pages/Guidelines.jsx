import React from "react";
import { Container } from "../components";

function Guidelines() {
return ( <div className="py-12"> <Container> <h1 className="text-3xl font-bold mb-6">Posting Guidelines</h1>


    <p className="mb-6">
      This platform is a study notes sharing website. Please upload only
      educational and learning related content so that students can learn
      easily from your notes.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">Allowed Content</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>School and college notes</li>
      <li>Subject explanations (Maths, Science, Computer, etc.)</li>
      <li>Important questions and answers</li>
      <li>Exam preparation guides</li>
      <li>Short revision notes</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">Not Allowed</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Abusive or harmful content</li>
      <li>Memes or unrelated images</li>
      <li>Advertisements or spam links</li>
      <li>Copied content without understanding</li>
      <li>Political or controversial topics</li>
    </ul>

    <p className="mt-6 text-gray-500">
      Posts not related to education may be removed to maintain quality of the platform.
    </p>
  </Container>
</div>


);
}

export default Guidelines;
