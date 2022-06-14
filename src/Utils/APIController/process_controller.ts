import { v4 as uuidv4 } from "uuid";
import {
  ProcessDefinitionApi,
  StartProcessInstanceDto,
  VariableValueDto,
} from "../api/src/generated-sources/openapi";
import { mapToDtoVariables } from "../Helpers/camunda_process_helper";
import { AbstractController } from "./abstract_controller";
export class ProcessController extends AbstractController {
  processDefinitionApi = new ProcessDefinitionApi(
    this.apiConfig,
    this.baseUrl,
    this.axiosInstance
  );

  public async startProcessInstance(
    processKey: string,
    variables: Map<string, any>
  ): Promise<string> {
    let processVariables: { [key: string]: VariableValueDto } =
      mapToDtoVariables(variables);

    // Create Dto
    var processInstanceDto: StartProcessInstanceDto = {
      businessKey: uuidv4(),
      variables: processVariables,
    };
    // Start process instance with Dto
    const { data } = await this.processDefinitionApi.startProcessInstanceByKey(
      processKey,
      processInstanceDto
    );

    return data.id ?? "id";
  }

  //   public async deleteProcess(processKey: string) {
  //     const res = await axios.delete(
  //       `http://localhost:8080/engine-rest/process-instance/${processKey}`
  //     );
  //     console.log("Response data: " + res.data);
  //   }
}
