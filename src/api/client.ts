import useSWR from "swr";

import api from ".";

export const useClients = () =>
  useSWR("clients", () =>
    api
      .get<
        {
          uuid: string;
          id: string;
          name: string;
          urls: string[];
        }[]
      >("/clients")
      .then(({ data }) => data),
  );
