import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function ProviderCard({provider}:any) {
  console.log("this is provider data", provider)
  return (
    <Card className="mx-auto w-full ">
      <CardHeader>
        <CardTitle>{provider?.providerProfile?.RestaurantName || "Default Restaurant"}</CardTitle>
        <CardDescription>
          {provider?.providerProfile?.address || "Default Address"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p><span className="font-semibold">Owner Name:</span> {provider?.name}</p>
        <p><span className="font-semibold">email:</span> {provider?.email}</p>
        <p><span className="font-semibold">isOpen:</span> {provider?.providerProfile?.isOpen ? "Open" : "Closed"}</p>
        <p><span className="font-semibold">Rating:</span> {provider?.providerProfile?.ratingAvg} out of 5</p>
        <p><span className="font-semibold">total menu:</span>{provider?.meals?.length}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Link href={`/provider/${provider?.providerProfile?.id}`}>view details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
