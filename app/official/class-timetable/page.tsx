export default function ClassTimetablePage() {
  const timetables = [
    {
      name: "Bachelor Degree Programmes",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/class-timetable#h.8g9x2dbv72qb",
    },
    {
      name: "Diploma Programmes",
      url: "https://sites.google.com/unimap.edu.my/academicunimap/class-timetable#h.o40f0qm8u0cu",
    },
  ];

  return (
    <section className="container-page py-16">
      <h1 className="section-title mb-8">
        Class Timetable
      </h1>

      <div className="grid gap-4">
        {timetables.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="card p-5 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg">
              {item.name}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}