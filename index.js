import express from "express";

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  // { date: "1/20/2022", name: "Um mês pro meu aniversário" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" },
];

const server = express();

server.get("/holidays", (req, res) => res.send(holidays));

server.get("/holidays/:month", (req, res) =>
  res.send(
    holidays.filter(
      (holiday) =>
        new Date(holiday.date).getMonth() + 1 === parseInt(req.params.month)
    )
  )
);

server.get("/is-today-holiday", (req, res) => {
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-US");
  const todayHoliday = holidays.find((holiday) => holiday.date === todayStr);

  if (todayHoliday) {
    res.send(`Sim, hoje é ${todayHoliday.name}`);
  } else {
    res.send("Não, hoje não é feriado");
  }
});

server.listen(4000, () =>
  console.log("Server is running and listening in port 4000...")
);
