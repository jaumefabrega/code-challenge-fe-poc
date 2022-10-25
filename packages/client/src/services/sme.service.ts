import axios from "axios";

import type {
  SME,
  Transaction,
  TransactionStatus,
} from "../../../lib-common/types";

const BASE_URL = "http://localhost:3000";

export const smeAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetchSME(): Promise<SME> {
  return smeAxios.get(`/sme-data`).then((res) => res.data);
}

async function fetchTransactions(
  userId: string,
  status: TransactionStatus
): Promise<Transaction[]> {
  return smeAxios
    .get(`/transactions`, {
      params: {
        userId,
        status,
      },
    })
    .then((res) => res.data.data);
}

export const smeService = {
  fetchSME,
  fetchTransactions,
};
