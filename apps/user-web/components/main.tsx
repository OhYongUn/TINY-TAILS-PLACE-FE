'use client';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';

const Main = () => {
  return (
    <main className="p-8 space-y-8">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src="/image/mianImg.webp"
          alt="Pet hotel"
          className="object-cover w-full h-[400px]"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center p-8 bg-black bg-opacity-50">
          <h2 className="text-4xl font-bold text-white">
            Where pet paradise begins
          </h2>
          <p className="mt-4 text-lg text-white">
            We're the first pet hotel designed to deliver a luxury experience
            for your best friends. From our luxe accommodations to our pampering
            services, we make sure your pets feel as comfortable and cared for
            as you do. Come see why we're the best place for your pet to stay
            while you're away.
          </p>
          <Button className="mt-4 bg-green-600 text-white">Learn More</Button>
        </div>
      </div>
      <section>
        <h3 className="text-2xl font-bold">Explore Our Services</h3>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <img
              src="/image/Boarding.webp"
              alt="Boarding"
              className="object-cover w-full h-[200px] rounded-t-lg"
            />
            <CardContent>
              <h4 className="text-lg font-bold">Boarding</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Your pets will love staying with us. We offer luxury
                accommodations, around-the-clock care, and all the amenities
                they need to feel at home.
              </p>
            </CardContent>
          </Card>
          <Card>
            <img
              src="/image/doggyCamp.webp"
              alt="Doggy Day Camp"
              className="object-cover w-full h-[200px] rounded-t-lg"
            />
            <CardContent>
              <h4 className="text-lg font-bold">Doggy Day Camp</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Give your pets a day of fun with our expertly trained camp
                counselors. They'll enjoy games, playtime, and socialization
                with other friendly dogs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <img
              src="/image/spa.webp"
              alt="Spa & Grooming"
              className="object-cover w-full h-[200px] rounded-t-lg"
            />
            <CardContent>
              <h4 className="text-lg font-bold">Spa & Grooming</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Treat your pets to a day at the spa. Our professional groomers
                offer a full suite of services to keep your pets looking and
                feeling their best.
              </p>
            </CardContent>
          </Card>
          <Card>
            <img
              src="/image/traning.webp"
              alt="Training"
              className="object-cover w-full h-[200px] rounded-t-lg"
            />
            <CardContent>
              <h4 className="text-lg font-bold">Training</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Help your pets be their best selves with our expert training
                programs. From basic obedience to behavioral issues, we offer
                personalized training to meet your pet's unique needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};
export default Main;
