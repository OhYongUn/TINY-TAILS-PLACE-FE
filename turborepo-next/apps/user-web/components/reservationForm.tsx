"use client";

import {Card, CardContent, CardFooter} from "@repo/ui/components/ui/card";
import {Label} from "@repo/ui/components/ui/label";
import {Input} from "@repo/ui/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@repo/ui/components/ui/popover";
import {Button} from "@repo/ui/components/ui/button";
import {Calendar} from "@repo/ui/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@repo/ui/components/ui/select";
import {CalendarDaysIcon} from "@repo/ui/components/ui/icons";

const ReservationForm = () => {
  return (
      <section className="bg-background py-8 px-4 md:px-6 flex-1">
          <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Complete Your Reservation</h2>
              <Card>
                  <CardContent className="space-y-6">
                      <div>
                          <h3 className="text-lg font-bold mb-2">Pet Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <Label htmlFor="pet-name">Pet Name</Label>
                                  <Input id="pet-name" placeholder="Enter pet's name"/>
                              </div>
                              <div>
                                  <Label htmlFor="pet-breed">Breed</Label>
                                  <Input id="pet-breed" placeholder="Enter pet's breed"/>
                              </div>
                              <div>
                                  <Label htmlFor="pet-age">Age</Label>
                                  <Input id="pet-age" type="number" placeholder="Enter pet's age"/>
                              </div>
                              <div>
                                  <Label htmlFor="pet-weight">Weight</Label>
                                  <Input id="pet-weight" type="number" placeholder="Enter pet's weight"/>
                              </div>
                          </div>
                      </div>
                      <div>
                          <h3 className="text-lg font-bold mb-2">Reservation Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <Label htmlFor="check-in">Check-in Date</Label>
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
                                  <Label htmlFor="check-out">Check-out Date</Label>
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
                                  <Label htmlFor="num-pets">Number of Pets</Label>
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
                          </div>
                      </div>
                      <div>
                          <h3 className="text-lg font-bold mb-2">Payment Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <Label htmlFor="card-number">Card Number</Label>
                                  <Input id="card-number" type="text" placeholder="Enter card number"/>
                              </div>
                              <div>
                                  <Label htmlFor="card-expiry">Expiration Date</Label>
                                  <div className="grid grid-cols-2 gap-2">
                                      <Select>
                                          <SelectTrigger className="w-full">
                                              <SelectValue placeholder="Month"/>
                                          </SelectTrigger>
                                          <SelectContent>
                                              <SelectItem value="01">January</SelectItem>
                                              <SelectItem value="02">February</SelectItem>
                                              <SelectItem value="03">March</SelectItem>
                                              <SelectItem value="04">April</SelectItem>
                                              <SelectItem value="05">May</SelectItem>
                                              <SelectItem value="06">June</SelectItem>
                                              <SelectItem value="07">July</SelectItem>
                                              <SelectItem value="08">August</SelectItem>
                                              <SelectItem value="09">September</SelectItem>
                                              <SelectItem value="10">October</SelectItem>
                                              <SelectItem value="11">November</SelectItem>
                                              <SelectItem value="12">December</SelectItem>
                                          </SelectContent>
                                      </Select>
                                      <Select>
                                          <SelectTrigger className="w-full">
                                              <SelectValue placeholder="Year"/>
                                          </SelectTrigger>
                                          <SelectContent>
                                              <SelectItem value="2023">2023</SelectItem>
                                              <SelectItem value="2024">2024</SelectItem>
                                              <SelectItem value="2025">2025</SelectItem>
                                              <SelectItem value="2026">2026</SelectItem>
                                              <SelectItem value="2027">2027</SelectItem>
                                              <SelectItem value="2028">2028</SelectItem>
                                              <SelectItem value="2029">2029</SelectItem>
                                              <SelectItem value="2030">2030</SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>
                              </div>
                              <div>
                                  <Label htmlFor="card-cvc">CVC</Label>
                                  <Input id="card-cvc" type="text" placeholder="Enter CVC"/>
                              </div>
                          </div>
                      </div>
                  </CardContent>
                  <CardFooter>
                      <Button>Complete Reservation</Button>
                  </CardFooter>
              </Card>
          </div>
      </section>
  )
}
export default ReservationForm;
