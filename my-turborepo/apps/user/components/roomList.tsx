"use client";


import {Card, CardContent} from "@repo/ui";
import {Button} from "@repo/ui";
import {PawPrintIcon} from "@user/components/icons/icons";


const RoomList = () => {
  return (
      <section className="bg-muted py-8 px-4 md:px-6 flex-1">
          <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                      <img
                          src="/placeholder.svg"
                          alt="Room Image"
                          width={400}
                          height={300}
                          className="rounded-t-lg object-cover w-full aspect-video"
                      />
                      <CardContent className="p-4">
                          <h3 className="text-xl font-bold mb-2">Deluxe Suite</h3>
                          <p className="text-muted-foreground mb-4">Spacious room with private balcony and panoramic
                              views.</p>
                          <div className="flex items-center justify-between">
                              <div className="text-muted-foreground">
                                  <PawPrintIcon className="w-4 h-4 inline-block mr-1"/>
                                  Accommodates up to 2 pets
                              </div>
                              <Button variant="outline">View Details</Button>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <img
                          src="/placeholder.svg"
                          alt="Room Image"
                          width={400}
                          height={300}
                          className="rounded-t-lg object-cover w-full aspect-video"
                      />
                      <CardContent className="p-4">
                          <h3 className="text-xl font-bold mb-2">Standard Room</h3>
                          <p className="text-muted-foreground mb-4">Cozy room with basic amenities for your pet's
                              comfort.</p>
                          <div className="flex items-center justify-between">
                              <div className="text-muted-foreground">
                                  <PawPrintIcon className="w-4 h-4 inline-block mr-1"/>
                                  Accommodates 1 pet
                              </div>
                              <Button variant="outline">View Details</Button>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <img
                          src="/placeholder.svg"
                          alt="Room Image"
                          width={400}
                          height={300}
                          className="rounded-t-lg object-cover w-full aspect-video"
                      />
                      <CardContent className="p-4">
                          <h3 className="text-xl font-bold mb-2">Premium Suite</h3>
                          <p className="text-muted-foreground mb-4">
                              Luxurious suite with private outdoor area and premium amenities.
                          </p>
                          <div className="flex items-center justify-between">
                              <div className="text-muted-foreground">
                                  <PawPrintIcon className="w-4 h-4 inline-block mr-1"/>
                                  Accommodates up to 3 pets
                              </div>
                              <Button variant="outline">View Details</Button>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      </section>
  )
}

export default RoomList;
