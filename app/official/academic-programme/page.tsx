export default function AcademicProgrammePage() {
  const faculties = [
    {
      name: "Faculty of Civil Engineering & Technology (FKTA)",
      url: "/official/academic-programme/fkta",
    },
    {
      name: "Faculty of Electrical Engineering & Technology (FKTE)",
      url: "/official/academic-programme/fkte",
    },
    {
      name: "Faculty of Electronic Engineering & Technology (FKTEN)",
      url: "/official/academic-programme/fkten",
    },
    {
      name: "Faculty of Intelligent Computing (FKC)",
      url: "/official/academic-programme/fkc",
    },
    {
      name: "Faculty of Chemical Engineering & Technology (FKTK)",
      url: "/official/academic-programme/fktk",
    },
    {
      name: "Faculty of Mechanical Engineering & Technology (FKTM)",
      url: "/official/academic-programme/fktm",
    },
    {
      name: "Faculty of Business & Communication (FPK)",
      url: "/official/academic-programme/fpk",
    },
  ];

  return (
    <section className="container-page py-16">
      <h1 className="section-title mb-8">
        Academic Programme
      </h1>

      <div className="grid gap-4">
        {faculties.map((faculty) => (
          <a
            key={faculty.name}
            href={faculty.url}
            className="card p-5 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg">
              {faculty.name}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}