import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import ProjectData from "../models/ProjectModel";
import Project from "../components/Project/project";
import Layout from "../components/layout";
import Contact from "../components/Contact/contact";
import About from "../components/About/about";

import dynamic from "next/dynamic";
const Hero = dynamic(() => import("../components/Hero/hero"), { ssr: false });
const Index = ({ projectDatas }) => (
  <>
    <Layout>
      <Hero />
      <About />
      <Project projectDatas={projectDatas} />
      <Contact />
    </Layout>
  </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await ProjectData.find({});
  const projectDatas = result.map((doc) => {
    const projectData = doc.toObject();
    projectData._id = projectData._id.toString();
    return projectData;
  });

  return { props: { projectDatas: projectDatas } };
}

export default Index;
