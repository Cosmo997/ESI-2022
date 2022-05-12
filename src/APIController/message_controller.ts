import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../config/camunda-config";

import {
  CorrelationMessageDto,
  MessageApi,
  MessageCorrelationResultWithVariableDto,
} from "../api/src/generated-sources/openapi";
import { AbstractController } from "./abstract_controller";

export class MessageController extends AbstractController {
  messageApi = new MessageApi(this.apiConfig, this.baseUrl, this.axiosInstance);

  public async sendMessage(
    correlationMessageDto: CorrelationMessageDto
  ): Promise<AxiosResponse<MessageCorrelationResultWithVariableDto[], any>> {
    const result = await this.messageApi.deliverMessage(correlationMessageDto);
    return result;
  }
}
