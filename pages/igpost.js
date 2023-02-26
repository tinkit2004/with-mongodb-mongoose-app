import React from "react";
import Script from "next/script";
import Layout from "../components/layout";
import { Box, Flex } from "@chakra-ui/react";
export default function Igpost() {
  return (
    <Layout>
      <Box w="80%" h="50%">
        <div
          className="embedsocial-hashtag"
          data-ref="4c9e087e865c7c45c69f7e353265e1e1568b9c56"
        >
          {" "}
          <a
            className="feed-powered-by-es feed-powered-by-es-feed-new"
            href="https://embedsocial.com/social-media-aggregator/"
            target="_blank"
            rel="noreferrer"
            title="Widget by EmbedSocial"
          ></a>{" "}
        </div>{" "}
      </Box>
      <Script id="show-banner">
        {` (function(d, s, id) { var js; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "https://embedsocial.com/cdn/ht.js"; d.getElementsByTagName("head")[0].appendChild(js); }(document, "script", "EmbedSocialHashtagScript"));`}{" "}
      </Script>
    </Layout>
  );
}
