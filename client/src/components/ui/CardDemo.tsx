import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
    
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
              <Label htmlFor="email">FullName</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Your fullname"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
          
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="number">Phone number</Label>
               
              </div>
              <Input id="phoneNumber" type="text" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-green-600">
         Register To Event
        </Button>
       
      </CardFooter>
    </Card>
  )
}
