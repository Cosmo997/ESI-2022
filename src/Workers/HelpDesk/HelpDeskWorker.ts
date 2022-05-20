import { ValueMap, Variables } from "camunda-external-task-client-js";
import { CorrelationMessageDto, VariableValueDto } from "../../api/src/generated-sources/openapi";
import { ClientManager } from "../../client";
import { baseUrl } from "../../config/camunda-config";
import { titleCaseWord } from "../../Helpers/extension";
import { MessageController } from "../../APIController/message_controller";
import { v4 } from "uuid";


export class HelpDeskWorker{
    
   public ticketSubscription(topic: string, messageName: string){
        const client = new ClientManager(baseUrl).getClient();
        client.subscribe(topic, async  ({ task, taskService }) => {
            console.log(`\n\n------------ TICKET WORKER STARTED TASK ID: ${task.id}------------\n`);
            const correlationMessageDto: CorrelationMessageDto = this._generateCorrelationMessageDTO(
                messageName,
                task.businessKey,
                task.variables.getAll()
            );
            await this._sendMessage(correlationMessageDto);

            const newProcessVariables = new Variables().set(
                "ticket-opening-date",
                new Date()
            );
            await taskService.complete(task, newProcessVariables);
        
            console.log(`\n------------TICKET WORKER TERMINATED TASK ID: ${task.id} ------------\n\n`);
            client.stop();
          });
   }

   public saveTicket(topic: string){
    const client = new ClientManager(baseUrl).getClient();
    client.subscribe(topic, async  ({ task, taskService }) => {
        console.log(`\n\n------------ SAVE TICKET OPERATION STARTED \nTASK ID: ${task.id}------------\n`);
        const newProcessVariables = new Variables().setAll(
          {"ticket-save-date" : new Date(), "ticketId" : v4(), },
        );

        // Put here save logic...


        await taskService.complete(task, newProcessVariables);
    
        console.log(`\n------------SAVE TICKET OPERATION TERMINATED \nTASK ID: ${task.id} ------------\n\n`);
        client.stop();
      });
   }

   public updateTicket(topic: string){
    const client = new ClientManager(baseUrl).getClient();
    client.subscribe(topic, async  ({ task, taskService }) => {
        console.log(`\n\n------------ UPDATE TICKET OPERATION STARTED \nTASK ID: ${task.id}------------\n`);
        const newProcessVariables = new Variables().setAll(
          { "ticket-update-date": new Date(), "ticketStatus": "closed"}
        );

        // Put here update logic...

        await taskService.complete(task, newProcessVariables);
    
        console.log(`\n------------UPDATE TICKET OPERATION TERMINATED \nTASK ID: ${task.id} ------------\n\n`);
        client.stop();
      });
   }

   private _generateCorrelationMessageDTO(messageName: string, businessKey:  string | undefined, variables: ValueMap): CorrelationMessageDto  {
        const jsonObject = JSON.parse(JSON.stringify(variables))
        let map = new Map<string, any>()  
        for (var value in jsonObject) {  
            map.set(value,jsonObject[value])  
        }
        this._printVariables(map);
        let processVariables : { [key: string]: VariableValueDto} = {};
        for (let [key, value] of map) {
            processVariables[key] = {value: value, type: titleCaseWord(typeof value)};
        }
        const correlationMessageDto: CorrelationMessageDto = {
            messageName: messageName,
            businessKey: businessKey,
            processVariables: processVariables,
          };
        return correlationMessageDto;
   }

   private async _sendMessage(correlationMessageDto: CorrelationMessageDto){
        const messageController = new MessageController();
        await messageController.sendMessage(correlationMessageDto);
        console.log("\nMessage Sent!\n");
   }

   private _printVariables(map: Map<string, any>){
    console.log("\nTASK VARIABLES: \n")
    for (let [key, value] of map) {
        if(value != undefined){
            console.log(`${titleCaseWord(key)} :`, value);
        }
    }
   }
}