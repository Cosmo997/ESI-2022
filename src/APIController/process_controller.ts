import axios, {AxiosRequestConfig} from "axios";
import {v4 as uuidv4} from 'uuid';

export class ProcessController{

    public async startProcessInstance(processKey: string): Promise<string> {
        let businessKey= uuidv4();
        const body = {'businessKey': businessKey};
    
        const res = await axios.post(`http://localhost:8080/engine-rest/process-definition/key/${processKey}/start`, body);
    
        return res.data['id'];
    }

    public async deleteProcess(processKey: string) {
        const res = await axios.delete(`http://localhost:8080/engine-rest/process-instance/${processKey}`);
        console.log("Response data: " + res.data);
    }
}




