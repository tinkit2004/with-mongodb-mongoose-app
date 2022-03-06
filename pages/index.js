import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import ProjectData from "../models/Project";
import Project from "../components/Project/project";
import Layout from "../components/layout";
import Contact from "../components/Contact/contact";
import About from "../components/About/about";
import Hero from "../components/Hero/hero";
const Index = ({ projectDatas }) => (
  <>
    <Layout>
      <Hero />
      <About />
      <Project projectDatas={projectDatas} />
      <Contact />

      {/* Create a card for each pet */}
      {projectDatas.map((projectData) => (
        <div key={projectData._id}>
          <div className="card">
            <img src={projectData.projectImageUrl} />
            <h5 className="pet-name">{projectData.projectTitle}</h5>
            <div className="main-content">
              <p className="pet-name">{projectData.projectTitle}</p>
              <p className="owner">Owner: {projectData.projectTitle}</p>

              {/* Extra Pet Info: Likes and Dislikes */}
              <div className="likes info">
                <p className="label">Likes</p>
                {/* <ul>
                {pet.likes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul> */}
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                {/* <ul>
                {pet.dislikes.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul> */}
              </div>

              {/* <div className="btn-container">
              <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${pet._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div> */}
            </div>
          </div>
        </div>
      ))}
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
