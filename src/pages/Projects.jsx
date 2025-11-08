import React from "react";
import project11firstimage from "../assets/projects/project1/projectimage1image.png";
import project12firstimage from "../assets/projects/project1/projectimage2image.png";
import project13firstimage from "../assets/projects/project1/projectimage3image.png";
import project14firstimage from "../assets/projects/project1/projectimage4image.png";
import project15firstimage from "../assets/projects/project1/projectimage5image.png";

import project21firstimage from "../assets/projects/project2/project21firstimage.png";
import project22firstimage from "../assets/projects/project2/project22firstimage.png";
import project23firstimage from "../assets/projects/project2/project23firstimage.png";
import project24firstimage from "../assets/projects/project2/project24firstimage.png";
import project25firstimage from "../assets/projects/project2/project25firstimage.png";

const Projects = () => {
  const projectData = [
    {
      title: "Learn From Sakthi",
      domain: "https://learnfromsakthi.vercel.app/",
      roles: ["Admin", "College", "Teacher", "Student"],
      images: [
        project11firstimage,
        project12firstimage,
        project13firstimage,
        project14firstimage,
        project15firstimage,
      ],
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Sakthi Insurance",
      domain: "https://sakthiinsurance.vercel.app/",
      roles: ["Admin", "Agent", "Customer"],
      images: [
        project21firstimage,
        project22firstimage,
        project23firstimage,
        project24firstimage,
        project25firstimage,
      ],
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        🚀 My Featured Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {projectData.map((project, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-xl bg-gradient-to-br ${project.color} text-white p-1 transition-transform duration-300 hover:scale-105`}
          >
            <div className="bg-white text-gray-900 rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-center">
                  {project.title}
                </h2>

                <a
                  href={project.domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block text-center mb-4"
                >
                  Visit Website
                </a>

                <div className="flex justify-center mb-4">
                  {project.roles.map((role, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full mx-1 shadow-md"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={img}
                        alt={`${project.title} ${i + 1}`}
                        className="w-full h-36 object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 rounded-full hover:opacity-90 transition-all duration-300 shadow-md">
                  Explore Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
