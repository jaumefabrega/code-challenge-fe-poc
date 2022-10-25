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
  status: TransactionStatus,
  page: number
): Promise<{
  data: Transaction[];
  meta: { limit: number; offset: number; total: number };
}> {
  return smeAxios
    .get(`/transactions`, {
      params: {
        userId,
        status,
        offset: page * 10,
        limit: 10,
      },
    })
    .then((res) => res.data);
}

export const smeService = {
  fetchSME,
  fetchTransactions,
};
