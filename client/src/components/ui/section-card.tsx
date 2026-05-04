import { Button } from "./button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Event} from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  event: Event;

}


export function SectionCards({ event }: Props) {
  const { title, description, startDate, endDate, location, sessions } = event;

  return (
    <>
    <div className="grid grid-col-3 gap-20">
        <div className="flex flex-row justify-center  m-auto gap-10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card w-64 bg-card-first-bg ">
          <CardHeader>
            <CardDescription className="text-background">
              Event Start
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              11:00 - 12:00
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-background">{startDate}</div>
          </CardFooter>
        </Card>
        <Card className="@container/card w-64 bg-card-second-bg">
          <CardHeader>
            <CardDescription>Event Organizer</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              AVAANA HUB
              {/* {organizer} */}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {/* Down 20% this period <IconTrendingDown className="size-4" /> */}
            </div>
            <div>
              avaana@gmail.com
              {/* {mail} */}
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card w-64 bg-card-last-bg">
          <CardHeader>
            <CardDescription>Event Avenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {location}
            </CardTitle>
            {/* <CardAction>
            <Badge variant="outline">
              {/* <IconTrendingUp /> 
              +12.5%
            </Badge>
          </CardAction> */}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {/* Strong user retention <IconTrendingUp className="size-4" /> */}
            </div>
            <div>AXIAN ANDRAHARO</div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-row justify-center gap-10 ">
        <Card className="relative  w-full max-w-sm pt-0">
          <CardHeader className="text-background ">
            <CardTitle className="text-2xl">{title.toUpperCase()}</CardTitle>
            <CardDescription className="text-background">
              {description}
            </CardDescription>
          </CardHeader>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdGvNlLLu9WU1r3yMaMIvkEgjvC7dgGVyt6A&s"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded"
          />
          <CardHeader>
            <CardDescription className="text-background">
              {description}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* field inscription for Event */}
        <Card className="w-full max-w-sm ring-1 ring-background">
           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-center">
              Inscription
            </CardTitle>
          <CardContent>
            
            <form >
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">FullName</Label>
                  <Input
                    className="bg-foreground/10 border-none placeholder:text-input-placeholder"
                    id="email"
                    type="email"
                    placeholder="Enter Your fullname"
                    required
                    
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  className="bg-foreground/10 border-none placeholder:text-input-placeholder"
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="number">Phone number</Label>
                  </div>
                  <Input 
                  className="bg-foreground/10 border-none placeholder:text-input-placeholder"
                  id="phoneNumber" type="text" required placeholder="Enter Your phone number" />
                </div>
              </div>
            </form>
            
          </CardContent>
         <Button type="submit" className="w-48 flex bg-green-600 m-auto">
              Register To Event
            </Button>
        </Card>
      </div>

    
     </div>
    
    </>
  );
}
