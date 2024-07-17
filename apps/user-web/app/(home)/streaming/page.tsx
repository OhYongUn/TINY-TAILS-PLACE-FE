import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {CalendarIcon, CreditCardIcon, HomeIcon, PawPrintIcon, PlayIcon, SlashIcon} from "@/_components/icons";

const StreamingHome = () => {
  return (
      <div className="min-h-screen bg-gray-50">
          <main className="flex flex-col items-center p-4 md:flex-row md:justify-between md:p-8">
              <section className="w-full md:w-2/3">
                  <h2 className="mb-4 text-2xl font-bold">Live Feed</h2>
                  <div className="relative w-full h-64 bg-blue-500">
                      <PlayIcon
                          className="absolute w-12 h-12 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"/>
                  </div>
                  <Button variant="outline" className="mt-4">
                      View Larger
                  </Button>
                  <div className="mt-8">
                      <h3 className="mb-2 text-lg font-semibold">Chat with us</h3>
                      <div className="flex items-start space-x-2">
                          <Avatar>
                              <AvatarImage src="/placeholder-user.jpg"/>
                              <AvatarFallback>PH</AvatarFallback>
                          </Avatar>
                          <div className="p-2 bg-white rounded-md shadow">
                              <p className="text-sm font-medium">Pet hotel</p>
                              <p className="text-sm">Hello! How can we help you today?</p>
                          </div>
                      </div>
                      <div className="flex items-center mt-4">
                          <Input placeholder="Type your message here" className="flex-1"/>
                          <Button className="ml-2">Send</Button>
                      </div>
                  </div>
              </section>
              <aside className="w-full mt-8 md:w-1/3 md:mt-0">
                  <h3 className="mb-4 text-lg font-semibold">Reservation</h3>
                  <div className="space-y-4">
                      <div className="flex items-center p-4 bg-white rounded-md shadow">
                          <CalendarIcon className="w-5 h-5 text-gray-700"/>
                          <div className="ml-4">
                              <p className="font-medium">Christmas Day</p>
                              <p className="text-sm text-gray-500">Check-in: 12/25/2022</p>
                          </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-md shadow">
                          <CalendarIcon className="w-5 h-5 text-gray-700"/>
                          <div className="ml-4">
                              <p className="font-medium">New Year's Eve</p>
                              <p className="text-sm text-gray-500">Check-out: 12/31/2022</p>
                          </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-md shadow">
                          <PawPrintIcon className="w-5 h-5 text-gray-700"/>
                          <div className="ml-4">
                              <p className="font-medium">Pets</p>
                              <p className="text-sm text-gray-500">2 dogs, 1 cat</p>
                          </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-md shadow">
                          <HomeIcon className="w-5 h-5 text-gray-700"/>
                          <div className="ml-4">
                              <p className="font-medium">Room</p>
                              <p className="text-sm text-gray-500">Standard suite</p>
                          </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-md shadow">
                          <SlashIcon className="w-5 h-5 text-gray-700"/>
                          <div className="ml-4">
                              <p className="font-medium">Add playtime</p>
                              <p className="text-sm text-gray-500">No</p>
                          </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-md shadow">
                          <CreditCardIcon className="w-5 h-5 text-gray-700"/>
                          <div className="ml-4">
                              <p className="font-medium">Total</p>
                              <p className="text-sm text-gray-500">$500</p>
                          </div>
                      </div>
                  </div>
              </aside>
          </main>
      </div>
  );

}
export default StreamingHome;
