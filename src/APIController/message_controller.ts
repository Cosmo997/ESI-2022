import axios from "axios";
import { baseUrl } from "../config/camunda-config";

export async function sendMessage(body: any) {
    await axios.post(`${baseUrl}/message`, body);
    console.log('\nMessage Sended!');
}