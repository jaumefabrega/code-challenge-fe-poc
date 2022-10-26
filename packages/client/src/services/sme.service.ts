import axios from "axios";

import type { SME, Transaction, User } from "../../../lib-common/types";
import { FilterTransactionStatus } from "../pages/dashboard/Dashboard";

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

async function fetchUsers(): Promise<User[]> {
  return smeAxios.get(`/users`).then((res) => res.data);
}

async function fetchTransactions(
  page: number,
  status?: FilterTransactionStatus
): Promise<{
  data: Transaction[];
  meta: { limit: number; offset: number; total: number };
}> {
  return smeAxios
    .get(`/transactions`, {
      params: {
        status,
        offset: page * 10,
        limit: 10,
      },
    })
    .then((res) => res.data);
}

export const smeService = {
  fetchSME,
  fetchUsers,
  fetchTransactions,
};
