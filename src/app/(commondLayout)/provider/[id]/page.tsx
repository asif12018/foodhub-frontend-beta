import { getProviderProfileByIdAction } from "@/server action/profile.action";
import { ProductCard1, Product } from "@/components/product-card1";
import { Star, MapPin, Clock } from "lucide-react";
import foodSingleData from "../../../../constants/food.types";
import ProviderProfile from "@/components/commerce-ui/Provider-Profile";

export default async function ProviderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await getProviderProfileByIdAction(id);

  if (error || !data?.data) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load provider
        </h2>
        <p className="text-muted-foreground">
          The provider profile could not be found.
        </p>
      </div>
    );
  }

  const provider = data.data;
  const meals: foodSingleData[] = provider.meals || [];

  // console.log("this is provider data",provider?.user)

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      {/* Provider Header Section */}
      <div className="bg-card rounded-xl p-8 shadow-sm border mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div className="p-2">
              <ProviderProfile user={provider?.user}/>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {provider.RestaurantName}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground mt-4 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>
                  {provider.address ? `${provider.address}, ` : ""}
                  {provider.city || "Location not specified"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {provider.isOpen ? (
                    <span className="text-green-600 font-medium">Open</span>
                  ) : (
                    <span className="text-red-500 font-medium">Closed</span>
                  )}
                  {provider.openingTime &&
                    provider.closingTime &&
                    ` • ${provider.openingTime} - ${provider.closingTime}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-xl">
                <span>{provider.ratingAvg.toFixed(1)}</span>
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {provider.ratingCount}{" "}
                {provider.ratingCount === 1 ? "Review" : "Reviews"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Menu</h2>

        {meals.length === 0 ? (
          <div className="text-center py-10 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              No meals currently available from this provider.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => {
              const productData: Product = {
                id: meal.id,
                name: meal.name,
                image: {
                  src:
                    meal.imageUrl ||
                    "https://placehold.co/600x400/png?text=No+Image",
                  alt: meal.name,
                },
                link: `/allFood/${meal.id}`,
                description: meal.description,
                price: {
                  regular: meal.price,
                  sale: meal.discountPrice,
                  currency: "tk",
                },
                cuisine: meal.cuisine,
                dietary_tags: meal.dietary_tags || [],
                preparation_time: meal.prepTimeMinutes,
                restaurant: provider.RestaurantName,
              };

              return <ProductCard1 key={meal.id} product={productData} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
