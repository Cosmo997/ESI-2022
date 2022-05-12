import axios from "axios";
import { baseUrl } from "../config/camunda-config";
import { UserTask } from "../Model/model";

export class TaskController {
    public async claimTask(userTask: UserTask, userId: string) {
        console.log('\nclaim task with name: ' +userTask.name+ ' and id: ' +userTask.id);
        const url = `${baseUrl}/task/${userTask.id}/claim`;
        const body = {"userId": userId};
        await axios.post(url, body);
    }

    public async getCurrentTask(proccessInstanceId: string): Promise<UserTask> {
        console.log('\nGet current task with process instance id: ' +proccessInstanceId);
        const url = `${baseUrl}/task?processInstanceId=${proccessInstanceId}`;
        const res = await axios.get<[UserTask]>(url);
        for(let task of res.data){
            console.log(task.name);
        }
        return res.data[0];
    }

    public async submitForm(userTask: UserTask, body: any){
        console.log('\nSubmit form to userTask named: ' +userTask.name);
        const url = `${baseUrl}/task/${userTask.id}/submit-form`;
        await axios.post(url, body)
    }
}   
