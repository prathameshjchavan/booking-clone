import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";

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

async function fetch() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 10000);
  });
}

const SearchPage = async ({ searchParams }: Props) => {
  // if (!searchParams.url) notFound();

  // const results = await fetchResults(searchParams);

  // if (!results) return <div>No results...</div>;

  // console.log(results);

  await fetch();

  return <div>SearchPage</div>;
};

export default SearchPage;
