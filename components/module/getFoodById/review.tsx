import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Star } from "lucide-react";
import { ReviewData, UserData } from "@/src/constants/food.types";

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
];

export function ItemGroupExample({ reviews }: { reviews: ReviewData }) {
  console.log("reviews", reviews);
  return (
    <ItemGroup className="max-w-auto">
      {people.map((person, index) => (
        <Item key={person.username} variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarImage
                src={reviews?.user?.image || person.avatar}
                className="grayscale"
              />
              <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent className="gap-1">
            <ItemTitle>{reviews?.user?.name}</ItemTitle>
            <ItemDescription>{reviews?.comment}</ItemDescription>
          </ItemContent>
          <div className="flex items-center gap-1 ml-auto">
            {reviews?.rating}
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          </div>
        </Item>
      ))}
    </ItemGroup>
  );
}
