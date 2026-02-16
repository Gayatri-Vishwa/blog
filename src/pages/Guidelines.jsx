import React from "react";
import { Container } from "../components";

function Guidelines() {
return ( <div className="py-12"> <Container> <h1 className="text-3xl font-bold mb-6">Posting Guidelines</h1>

    <p className="mb-6">
      This platform is a developer blogging website. Please post only
      technical and programming related content.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">Allowed Content</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Programming tutorials</li>
      <li>Error solutions and debugging guides</li>
      <li>Web development concepts</li>
      <li>Project explanations</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">Not Allowed</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Personal posts</li>
      <li>Motivational quotes</li>
      <li>Political or non-technical content</li>
      <li>Spam</li>
    </ul>

    <p className="mt-6 text-gray-500">
      Posts not related to development may be removed.
    </p>
  </Container>
</div>


);
}

export default Guidelines;
