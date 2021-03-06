import useSWR from 'swr';
import axios from 'axios';

export default function useAccount() {
  const fetcher = url => axios.get(url).then(res => res.data);

  const { data, mutate, error } = useSWR(
    "/account",
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false }
  )

  return {
    mutate,
    error,
    account: data?.account
  }
}