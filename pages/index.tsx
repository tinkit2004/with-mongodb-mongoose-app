import dbConnect from "../lib/dbConnect";
import { ProjectData, ProjectInterface } from "../models/ProjectModel";
import Project from "../components/Project/project";
import Layout from "../components/layout";
import Contact from "../components/Contact/contact";
import About from "../components/About/about";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";

interface ProjectsProps {
  projects: Project[];
}
const Hero = dynamic(() => import("../components/Hero/hero"), { ssr: false });
const Index = ({ projects }: ProjectsProps) => (
  <>
    <Layout title="Home">
      <Hero />
      <About />
      <Project projects={projects} />
      <Contact />
    </Layout>
  </>
);
/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetStaticProps = async () => {
  try {
    await dbConnect();
    const projects = await ProjectData.find({}).lean();

    const formattedProjects = projects.map((project) => {
      return {
        ...project,
        _id: project._id.toString(),
      };
    });
    console.log(formattedProjects);
    return {
      props: { projects: formattedProjects },
    };
  } catch (error) {
    console.error(error);

    return {
      props: { projects: [] },
    };
  }

  /* find all the data in our database */

  // const projectDatas = result.map((doc) => {
  //   const projectData = doc.toObject();

  //   return projectData;
  // });

  // return { props: { projectDatas: projectDatas } };
};

export default Index;
