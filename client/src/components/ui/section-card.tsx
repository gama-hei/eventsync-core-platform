

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Event } from "@/types/types";


interface Props{
    event: Event ;
}

export function SectionCards({event} : Props) {

   const { title, description, startDate,endDate,location,sessions } = event;
  return (
    <div className="grid    m-auto gap-10 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card w-64">
        <CardHeader >
          <CardDescription>Event Start</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            11:00 - 12:00
          </CardTitle>
        
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
        
          <div className="text-muted-foreground">
           {startDate}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card w-64">
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
          <div className="text-muted-foreground">
            avaana@gmail.com
            {/* {mail} */}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card w-64">
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
          <div className="text-muted-foreground">
            AXIAN ANDRAHARO
          </div>
        </CardFooter>
      </Card>
    
    </div>
  )
}
