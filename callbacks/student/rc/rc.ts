import axios, { AxiosResponse } from "axios";
import {
  ADMIN_RC_URL,
  SERVER_ERROR,
  setConfig,
  StatusResponse,
} from "../../constants";

export interface RC {
  ID: number;
  is_active: boolean;
  academic_year: string;
  type: string;
  start_date: number;
  phase: string;
  application_count_cap: number;
}

const instance = axios.create({
  baseURL: ADMIN_RC_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const rcRequest = {
  getAll: (token: string) =>
    instance.get<RC[]>("/student", setConfig(token)).then(responseBody),
};
export default rcRequest;
