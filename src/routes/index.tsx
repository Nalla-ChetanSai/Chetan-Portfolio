import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nalla Chetan Sai — Full Stack Web Developer" },
      {
        name: "description",
        content:
          "Portfolio of Nalla Chetan Sai — Full Stack Web Developer and CSE student at KL University. React, Java, Spring Boot, and modern web experiences.",
      },
      { property: "og:title", content: "Nalla Chetan Sai — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Premium futuristic portfolio of Nalla Chetan Sai. Projects, skills, and contact.",
      },
    ],
  }),
  component: Portfolio,
});
