export default function AcademicProgrammePage() {
  const faculties = [
    {
      name: "Faculty of Civil Engineering & Technology (FKTA)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-programme#h.lo2rt25nv2n",
    },
    {
      name: "Faculty of Electrical Engineering & Technology (FKTE)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-programme#h.pdax0j8nz8o",
    },
    {
      name: "Faculty of Electronic Engineering & Technology (FKTEN)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-programme#h.syvgwrd3dui",
    },
    {
      name: "Faculty of Intelligent Computing (FKC)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-programme#h.c0ctlj7ggbuh",
    },
    {
      name: "Faculty of Chemical Engineering & Technology (FKTK)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-programme#h.aw3sydic5i9e",
    },
    {
      name: "Faculty of Mechanical Engineering & Technology (FKTM)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-programme#h.la4axkkyfvkb",
    },
    {
      name: "Faculty of Business & Communication (FPK)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-programme#h.vq0j6f1kyps4",
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
            target="_blank"
            rel="noreferrer"
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