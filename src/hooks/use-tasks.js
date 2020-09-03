import useSWR from 'swr';
import axios from 'axios';

export default function useUser() {
  const fetcher = url => axios.get(url).then(res => res.data);

  const { data, mutate, error } = useSWR(
    "/tasks",
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false }
  )

  return {
    mutate,
    error,
    tasks: data?.tasks,
    isLimited: data?.is_limited
  }
}