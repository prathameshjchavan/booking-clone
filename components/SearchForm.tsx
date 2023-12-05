"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BedDoubleIcon, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Fragment } from "react";
import { Calendar } from "./ui/calendar";

const formSchema = z.object({
  location: z
    .string()
    .min(2, { message: "Location must be 2 characters or more" })
    .max(50),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z
    .number()
    .min(1, { message: "Please select atleast 1 adult" })
    .max(12, { message: "Max 12 adults Occupancy" }),
  childrens: z
    .number()
    .min(0)
    .max(12, { message: "Max 12 children Occupancy" }),
  rooms: z.number().min(1, { message: "Please select atleast 1 room" }),
});

const SearchForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      dates: {
        from: undefined,
        to: undefined,
      },
      adults: 1,
      childrens: 0,
      rooms: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkin = format(values.dates.from, "yyyy-MM-dd");
    const checkout = format(values.dates.to, "yyyy-MM-dd");
    const url = new URL("https://www.booking.com/searchresults.html");

    url.searchParams.set("ss", values.location);
    url.searchParams.set("group_adults", values.adults.toString());
    url.searchParams.set("group_children", values.childrens.toString());
    url.searchParams.set("no_rooms", values.childrens.toString());
    url.searchParams.set("checkin", checkin);
    url.searchParams.set("checkout", checkout);

    router.push(`/search?url=${url.href}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-x-0 space-y-4 rounded-lg lg:mx-auto lg:max-w-6xl lg:flex-row lg:space-x-2 lg:space-y-0"
      >
        <div className="w-full lg:max-w-sm">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-white">
                  Location
                  <BedDoubleIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="London, UK" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex-1 lg:max-w-sm">
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Dates</FormLabel>
                <FormMessage />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        name="dates"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal lg:w-[300px]",
                          !field.value.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {field.value.from ? (
                          field.value.to ? (
                            <Fragment>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd y")}
                            </Fragment>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select your dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      defaultMonth={field.value.from}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full items-center space-x-2">
          <div className="grid flex-1 items-center">
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => {
                const { onChange, ...fieldProps } = field;

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Adults</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="Adults"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        {...fieldProps}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid flex-1 items-center">
            <FormField
              control={form.control}
              name="childrens"
              render={({ field }) => {
                const { onChange, ...fieldProps } = field;

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Children</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="Childrens"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        {...fieldProps}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid flex-1 items-center">
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => {
                const { onChange, ...fieldProps } = field;

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Rooms</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="Rooms"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        {...fieldProps}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="mt-auto">
            <Button type="submit" className="bg-blue-500 text-base">
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
