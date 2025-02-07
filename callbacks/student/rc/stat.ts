import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "../../constants";

export interface StatType {
  student_recruitment_cycle_id: number;
  company_name: string;
  role: string;
  type: string;
}

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const statRequest = {
  getAll: (token: string, rcid: string) =>
    instance
      .get<StatType[]>(`/application/rc/${rcid}/stats`, setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as StatType[];
      }),
};

export default statRequest;
