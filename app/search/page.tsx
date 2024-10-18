import { Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MembershipCard() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="grid grid-cols-3 gap-5 items-center">
        {/* <div className=">

 </div> */}
        {/* 1st card */}
        <Card
          className={cn(
            "group w-full cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800 bg-[rgba(0,0,0,0.2)]",

            // Preload hover image by setting it in a pseudo-element
            "before:bg-[url(https://media1.tenor.com/m/MxTl6a26CpAAAAAC/lr-agl-super-saiyan-god-ss-goku-and-vegeta-lr-agl-ssb-goku-and-vegeta.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
            "hover:bg-[url(https://media1.tenor.com/m/MxTl6a26CpAAAAAC/lr-agl-super-saiyan-god-ss-goku-and-vegeta-lr-agl-ssb-goku-and-vegeta.gif)]  hover:scale-150 hover:z-10",
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-10",
            "transition-all duration-500",
            //text
            "hover:text-[rgba(0,0,0,0.7)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
          )}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Basic</CardTitle>
              <Badge className="bg-transparent text-blue-800">Starter</Badge>
            </div>
          </CardHeader>
          <CardContent className="font-bold">
            <ul className="list-disc list-inside space-y-2">
              <li>Access to gym equipment</li>
              <li>Locker room access</li>
              <li>2 group classes/month</li>
              <li>Gym Support</li>
            </ul>
            <p className="mt-4 text-2xl font-bold">$29.99/month</p>
            <Button className="mt-4 w-full">Choose Plan</Button>
          </CardContent>
        </Card>

        {/* 2nd Card */}
        <Card
          className={cn(
            "group w-full cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent bg-no-repeat dark:border-neutral-800 hover:text-white hover:font-bold bg-[rgba(0,0,0,0.2)]",

            // Preload hover image by setting it in a pseudo-element
            "before:bg-[url(https://media1.tenor.com/m/AtiBkSK7X3IAAAAC/dokkan-dokkan-battle.gif)] before:absolute before:inset-0 before:bg-cover before:opacity-0 before:z-[-1] transition-all duration-500",

            // On hover, change the background image and scale
            "hover:bg-[url(https://media1.tenor.com/m/AtiBkSK7X3IAAAAC/dokkan-dokkan-battle.gif)] hover:bg-cover hover:scale-150 hover:z-10",

            // Add an overlay on hover
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-10",

            "transition-transform transform duration-500",
            //text
            "hover:text-[rgba(0,0,0,0.7)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
          )}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Professional</CardTitle>
              <Badge className="bg-transparent text-white-800">Popular</Badge>
            </div>
          </CardHeader>
          <CardContent className="font-bold">
            <ul className="list-disc list-inside space-y-2">
              <li>Unlimited access to gym</li>
              <li>Unlimited group classes</li>
              <li>1 personal training session/month</li>
              <li>Access to sauna and pool</li>
              <li>Unlimited access to gym</li>
              <li>Unlimited group classes</li>
              <li>1 personal training session/month</li>
              <li>Access to sauna and pool</li>
            </ul>
            <p className="mt-4 text-2xl font-bold">$59.99/month</p>
            <Button className="mt-4 w-full">Choose Plan</Button>
          </CardContent>
        </Card>

        {/* 3rd Card */}
        <Card
          className={cn(
            "group w-full cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800 bg-[rgba(0,0,0,0.2)]",

            // Preload hover image by setting it in a pseudo-element
            "before:bg-[url(https://media1.tenor.com/m/899ZxzqJhs0AAAAC/lr-agl-goku-carnival.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
            "hover:bg-[url(https://media1.tenor.com/m/899ZxzqJhs0AAAAC/lr-agl-goku-carnival.gif)]  hover:scale-150 hover:z-10",
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-10",
            "transition-all duration-500",
            //text
            "hover:text-[rgba(0,0,0,0.7)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
          )}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Athlete</CardTitle>
              <Badge className="bg-transparent text-red-800">Popular</Badge>
            </div>
          </CardHeader>
          <CardContent className="font-bold">
            <ul className="list-disc list-inside space-y-2">
              <li>Unlimited access to gym</li>
              <li>Unlimited group classes</li>
              <li>Access to sauna and pool</li>
              <li>Unlimited group classes</li>
              <li>1 personal training session/month</li>
              <li>Access to sauna and pool</li>
            </ul>
            <p className="mt-4 text-2xl font-bold">$59.99/month</p>
            <Button className="mt-4 w-full">Choose Plan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
