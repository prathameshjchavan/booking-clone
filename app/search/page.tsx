import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import results from "@/data/results.json";

export type SearchParams = {
  url: string;
  group_adults: string;
  group_children: string;
  no_rooms: string;
  checkin: string;
  checkout: string;
};

interface Props {
  searchParams: SearchParams;
}

const SearchPage = async ({ searchParams }: Props) => {
  if (!searchParams.url) notFound();

  // const results = await fetchResults(searchParams);

  if (!results) return <div>No results...</div>;

  console.log(results);

  return <section>SearchPage</section>;
};

export default SearchPage;
