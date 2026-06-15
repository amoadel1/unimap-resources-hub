export default function AcademicCoursesPage() {
  const courses = [
    {
      name: "Courses @ Faculty of Civil Engineering & Technology (FKTA)",
      url: "/official/academic-courses/fkta",
    },
    {
      name: "Courses @ Faculty of Electrical Engineering & Technology (FKTE)",
      url: "/official/academic-courses/fkte",
    },
    {
      name: "Courses @ Faculty of Electronic Engineering & Technology (FKTEN)",
      url: "/official/academic-courses/fkten",
    },
    {
      name: "Courses @ Faculty of Chemical Engineering & Technology (FKTK)",
      url: "/official/academic-courses/fktk",
    },
    {
      name: "Courses @ Faculty of Mechanical Engineering & Technology (FKTM)",
      url: "/official/academic-courses/fktm",
    },
    {
      name: "Courses @ Faculty of Business & Communication (FPK)",
      url: "/official/academic-courses/fpk",
    },
    {
      name: "Courses @ Faculty of Intelligent Computing (FIC)",
      url: "/official/academic-courses/fkc",
    },
    {
      name: "Courses @ Co-Curriculum Centre",
      url: "/official/academic-courses/co-curriculum",
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