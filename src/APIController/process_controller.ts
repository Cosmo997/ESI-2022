import { v4 as uuidv4 } from "uuid";
import { ProcessDefinitionApi } from "../api/src/generated-sources/openapi";
import { AbstractController } from "./abstract_controller";
export class ProcessController extends AbstractController {
  processDefinitionApi = new ProcessDefinitionApi(
    this.apiConfig,
    this.baseUrl,
    this.axiosInstance
  );

  public async startProcessInstance(processKey: string): Promise<string> {
    let businessKey = uuidv4();
    // const res = await axios.post(
    //   `http://localhost:8080/engine-rest/process-definition/key/${processKey}/start`,
    //   body
    // );

    const { data } = await this.processDefinitionApi.startProcessInstanceByKey(
      processKey,
      { businessKey: businessKey }
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
