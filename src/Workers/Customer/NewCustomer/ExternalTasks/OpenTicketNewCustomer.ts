import { Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto, VariableValueDto } from "../../../../api/src/generated-sources/openapi";
import { MessageController } from "../../../../APIController/message_controller";
import { ClientManager } from "../../../../client";
import { baseUrl } from "../../../../config/camunda-config";
import { titleCaseWord } from "../../../../Helpers/extension";

/**
 * Prendere le variabili email, nome, cognome, company e ruoli ed inviarle
 */
export async function subToOpenTicketNewCustomer() {
  const clientManager = new ClientManager(baseUrl);

  const client = clientManager.getClient();

  const messageController = new MessageController();

  client.subscribe("open-ticket-task-new-customer", async function ({ task, taskService }) {
    console.log("\n\n------------ OPEN TICKET NEW CUSTOMER AND SEND INFO ------------\n");
    const currentDate = new Date();
    const newProcessVariables = new Variables().set(
      "ticket-opening-date",
      currentDate
    );
    const json = JSON.parse(JSON.stringify(task.variables.getAll()));
    let map = new Map<string, any>()  
    for (var value in json) {  
        map.set(value,json[value])  
    }  
    const ticketOpeningDate = newProcessVariables.get("ticket-opening-date");
    const businessKey = task.businessKey;

    console.log("Ticket Opening Date: " + ticketOpeningDate + "\n");
    console.log("Business Key: " + businessKey + "\n");
    console.log("Ticket Variables: \n");
    for (let [key, value] of map) {
        if(value != undefined){
            console.log(`${titleCaseWord(key)} :`, value);
        }
    }

    let processVariables : { [key: string]: VariableValueDto} = {};
    for (let [key, value] of map) {
        processVariables[key] = {value: value, type: titleCaseWord(typeof value)};
    }
    const correlationMessageDto: CorrelationMessageDto = {
      messageName: "new-ticket-received-message-new-customer",
      businessKey: businessKey,
      processVariables: processVariables,
    };
    await taskService.complete(task, newProcessVariables);
    await messageController.sendMessage(correlationMessageDto);
    console.log("\nMessage Sent!\n");

    console.log("\n------------SEND INFO TERMINATED------------\n\n");
    client.stop();
  });


}
