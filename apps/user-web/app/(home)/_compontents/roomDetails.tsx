"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/_components/ui/dialog";
import {Button} from "@/_components/ui/button";

const RoomDetails = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src="/placeholder.svg"
                            alt="Room Image"
                            width={400}
                            height={300}
                            className="rounded-lg object-cover w-full aspect-video"
                        />
                    </div>
                    <div>
                        <DialogHeader>
                            <DialogTitle>Premium Suite</DialogTitle>
                            <DialogDescription>Luxurious suite with private outdoor area and premium
                                amenities.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold mb-2">Room Specifications</h3>
                                <ul className="list-disc pl-4 text-muted-foreground">
                                    <li>Spacious 500 sq ft suite</li>
                                    <li>Private balcony with panoramic views</li>
                                    <li>Plush bedding and high-end furnishings</li>
                                    <li>Accommodates up to 3 pets</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Amenities</h3>
                                <ul className="list-disc pl-4 text-muted-foreground">
                                    <li>Gourmet pet treats and toys</li>
                                    <li>Dedicated pet concierge service</li>
                                    <li>Outdoor play area and walking trails</li>
                                    <li>24/7 on-site veterinary care</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Pricing</h3>
                                <p className="text-2xl font-bold">$150 per night</p>
                            </div>
                            <DialogFooter>
                                <Button>Book Now</Button>
                            </DialogFooter>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default RoomDetails;
