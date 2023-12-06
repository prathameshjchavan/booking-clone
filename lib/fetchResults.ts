import { SearchParams } from "@/app/search/page";

export const fetchResults = async (searchParams: SearchParams) => {
  const username = process.env.OXYLABS_USERNAME;
  const password = process.env.OXYLABS_PASSWORD;

  const url = new URL(searchParams.url);

  Object.keys(searchParams).forEach((key) => {
    if (key === "url" || key === "location") return;

    const value = searchParams[key as keyof SearchParams];

    if (typeof value === "string") {
      url.searchParams.append(key, value);
    }
  });

  const body = {
    source: "universal",
    url: url.href,
    parse: true,
    render: "html",
    parsing_instructions: {
      total_listings: {
        _fns: [
          {
            _fn: "xpath_one",
            _args: [".//h1/text()"],
          },
        ],
      },
      listings: {
        _fns: [
          {
            _fn: "xpath",
            _args: [".//div[@data-testid='property-card-container']"],
          },
        ],
        _items: {
          title: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[@data-testid='title']/text()"],
              },
            ],
          },
          description: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//h4[contains(@class, 'abf093bdfe e8f7c070a7')]/text()",
                ],
              },
            ],
          },
          booking_metadata: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[@data-testid='price-for-x-nights']/text()"],
              },
            ],
          },
          links: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//a[contains(@class, 'a78ca197d0')]/@href"],
              },
            ],
          },
          price: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//span[@data-testid='price-and-discounted-price']/text()",
                ],
              },
            ],
          },
          url: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//img[@data-testid='image']/@src"],
              },
            ],
          },
          rating: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//div[contains(@class, 'a3b8729ab1 d86cee9b25')]/text()",
                ],
              },
            ],
          },
          rating_count: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//div[contains(@class, 'abf093bdfe f45d8e4c32 d935416c47')]/text()",
                ],
              },
            ],
          },
        },
      },
    },
  };

  const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
    method: "POST",
    body: JSON.stringify(body),
    next: {
      revalidate: 60 * 60, // cache for 1 hour
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        "base64",
      )}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.results.length) return;

      const results: Result = data.results[0];

      return results;
    })
    .catch((error) => console.error(error));

  return response;
};
