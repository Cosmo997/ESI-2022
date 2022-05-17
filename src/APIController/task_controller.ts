import axios from "axios";
import { baseUrl } from "../config/camunda-config";
import { UserTask } from "../Model/model";
import { AbstractController } from "./abstract_controller";
import { TaskApi, TaskDto } from "../api/src/generated-sources/openapi";

export class TaskController extends AbstractController {
  taskApi = new TaskApi(this.apiConfig, this.baseUrl, this.axiosInstance);

  public async claimTask(userTask: TaskDto, userId: string) {
    console.log(
      "\nclaim task with name: " + userTask.name + " and id: " + userTask.id
    );
    await this.taskApi.claim(userTask.id ?? "", { userId: userId });

    // const url = `${baseUrl}/task/${userTask.id}/claim`;
    // const body = { userId: userId };
    // await axios.post(url, body);
  }

  public async getCurrentTask(proccessInstanceId: string): Promise<TaskDto> {
    const res = await this.taskApi.getTasks(proccessInstanceId);
    console.log(
      "\nGet current task with process instance id: " + proccessInstanceId
    );
    for (let task of res.data) {
      console.log(task.name);
    }
    return res.data[0];
  }

  public async submitForm(taskDto: TaskDto, body: any) {
    await this.taskApi.submit(taskDto.id!, { variables: body });

    // console.log("\nSubmit form to userTask named: " + userTask.name);
    // const url = `${baseUrl}/task/${userTask.id}/submit-form`;
    // await axios.post(url, body);
  }
}
