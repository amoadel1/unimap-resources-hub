export default function AcademicCoursesPage() {
  const courses = [
    {
      name: "Courses @ Faculty of Civil Engineering & Technology (FKTA)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.yiyn30vjoi9v",
    },
    {
      name: "Courses @ Faculty of Electrical Engineering & Technology (FKTE)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.an2289hcw6p0",
    },
    {
      name: "Courses @ Faculty of Electronic Engineering & Technology (FKTEN)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.r19mhfmdmzqo",
    },
    {
      name: "Courses @ Faculty of Chemical Engineering & Technology (FKTK)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.41bqc132tcwm",
    },
    {
      name: "Courses @ Faculty of Mechanical Engineering & Technology (FKTM)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.n71aqgbxl6w9",
    },
    {
      name: "Courses @ Faculty of Business & Communication (FPK)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.i1zkt86hv8pt",
    },
    {
      name: "Courses @ Faculty of Intelligent Computing (FIC)",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.eppda8xvtupa",
    },
    {
      name: "Courses @ Co-Curriculum Centre",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/academic-courses#h.o9g0jbrx5yem",
    },
  ];

  return (
    <section className="container-page py-16">
      <h1 className="section-title mb-8">
        Academic Courses
      </h1>

      <div className="grid gap-4">
        {courses.map((course) => (
          <a
            key={course.name}
            href={course.url}
            target="_blank"
            rel="noreferrer"
            className="card p-5 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg">
              {course.name}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}