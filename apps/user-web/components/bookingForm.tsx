"use client";

import {Popover, PopoverContent, PopoverTrigger} from "@repo/ui/components/ui/popover";
import { Button } from "@repo/ui/components/ui/button";

import {Calendar} from "@repo/ui/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@repo/ui/components/ui/select";
import {CalendarDaysIcon} from "@repo/ui/components/ui/icons";


const BookingForm = () => {
    return (
        <section className="bg-background py-8 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="check-in" className="block text-sm font-medium text-foreground mb-2">
                        Check-in
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <CalendarDaysIcon className="mr-2"/>
                                <span>Select Date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Calendar/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <label htmlFor="check-out" className="block text-sm font-medium text-foreground mb-2">
                        Check-out
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <CalendarDaysIcon className="mr-2"/>
                                <span>Select Date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Calendar/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <label htmlFor="pets" className="block text-sm font-medium text-foreground mb-2">
                        Number of Pets
                    </label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select number of pets"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 pet</SelectItem>
                            <SelectItem value="2">2 pets</SelectItem>
                            <SelectItem value="3">3 pets</SelectItem>
                            <SelectItem value="4">4 pets</SelectItem>
                            <SelectItem value="5">5 pets</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Button className="w-full">Find Available Rooms</Button>
                </div>
            </div>
        </section>

    )
}
export default BookingForm;
