export default function ClassTimetablePage() {
  const timetables = [
    {
      name: "Bachelor Degree Programmes",
      url: "/official/class-timetable/bachelor",
    },
    {
      name: "Diploma Programmes",
      url: "/official/class-timetable/diploma",
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