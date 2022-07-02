import { getSession } from "next-auth/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in. And I haven't write anything yet!",
    });
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};
