var client = require("../../Client.js");
// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("send-info", async function ({ task, taskService }) {
  // Put your business logic
  const id = task.variables.get('ID');
  const email = task.variables.get('email');
  const nome = task.variables.get('nome');
  const cognome = task.variables.get('cognome');

  console.log(`OOOOOOOOO ${id} OOOoOOO ${email} OOOOOO ${nome} OOOOOO ${cognome}'`);

  // complete the task
  await taskService.complete(task);
});