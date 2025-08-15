import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch (URL , key , enabled = true ) {
  const { data, isLoading, isError , error } = useQuery({
    queryKey:key,
    staleTime: 1000 * 60 * 5, //5 mins caching
    enabled:enabled,
    queryFn: async () => (await axios.get(URL)).data
  });

  return {data, isLoading, isError ,error };
}