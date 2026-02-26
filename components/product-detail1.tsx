"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Star, StarHalf } from "lucide-react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import z from "zod";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import foodSingleData from "@/src/constants/food.types";
import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { authClient } from "@/src/app/lib/auth-client";
import { getSession } from "@/server action/auth.action";
import { ItemGroupExample } from "./module/getFoodById/review";
type StockStatusCode = "IN_STOCK" | "OUT_OF_STOCK";

interface StockInfo {
  stockStatusCode?: StockStatusCode;
  stockQuantity?: number;
}

type option = {
  id: string;
  label: string;
  stockInfo: StockInfo;
  color?: string;
  value: string;
};

interface Hinges {
  label: string;
  id: string;
  name: FieldName;
  options?: option[];
  min?: number;
  max?: number;
}

interface ProductImagesProps {
  images: Array<{
    srcset: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    sizes: string;
  }>;
}

interface ReviewsProps {
  rate: number;
  totalReviewers: string;
}

interface PriceProps {
  regular: number;
  sale?: number;
  currency: string;
  text?: string;
}

interface ProductInfoProps {
  info?: Array<{
    label: string;
    value: string;
  }>;
}

type FormType = z.infer<typeof formSchema>;
type FieldName = keyof FormType;

type SizeOptionProps = option;

interface RadioGroupProps {
  options?: Array<option>;
  field: ControllerRenderProps<FormType>;
}

interface ProductFormProps {
  hinges?: Record<FieldName, Hinges>;
  selected: FormType;
}

const MAX_STARS = 5;

const PRODUCT_DETAILS = {
  name: "Urban Chill Jacket",
  color: "blue",
  size: "m",
  reviews: {
    rate: 3.5,
    totalReviewers: "5.8k",
  },
  description:
    "This denim puffer jacket blends warmth and street style, featuring tonal blue shades for a distinctive look that's both bold and versatile. Designed for comfort in any season.",
  price: {
    regular: 80.0,
    sale: 69.0,
    currency: "BDT",
  },
  hinges: {
    size: {
      label: "Select size",
      id: "size",
      name: "size",
      options: [
        {
          id: "xs",
          label: "xs",
          value: "xs",
          stockInfo: {
            stockStatusCode: "OUT_OF_STOCK",
          },
        },
        {
          id: "s",
          label: "s",
          value: "s",
          stockInfo: {
            stockStatusCode: "OUT_OF_STOCK",
          },
        },
        {
          id: "m",
          label: "m",
          value: "m",
          stockInfo: {
            stockStatusCode: "IN_STOCK",
          },
        },
        {
          id: "l",
          label: "l",
          value: "l",
          stockInfo: {
            stockStatusCode: "IN_STOCK",
          },
        },
        {
          id: "xl",
          label: "xl",
          value: "xl",
          stockInfo: {
            stockStatusCode: "IN_STOCK",
          },
        },
      ],
    },
  } as Record<FieldName, Hinges>,
  images: [
    {
      srcset:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-1.jpg 640w",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-3.jpg",
      alt: "",
      width: 1920,
      height: 2880,
      sizes: "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
    },
  ],
};

interface ProductDetail1Props {
  className?: string;
  food: foodSingleData;
}

const ProductDetail1 = ({ className, food }: ProductDetail1Props) => {
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await getSession();
      setSessionData(data);
    };
    fetchSession();
  }, []);

  console.log("this is session data", sessionData?.user?.roles);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  // check total price
  useEffect(() => {
    if (food.discountPrice) {
      setTotalPrice(quantity * food.discountPrice);
    } else {
      setTotalPrice(quantity * food.price);
    }
  }, [quantity]);

  //create order

  const handleCreateOrder = async () => {
    const { data, error } = await orderService.createOrder(food.id, quantity);
    if (data?.success) {
      toast.success(data.message);
      redirect("/");
    }
    console.log(error);
    if (error) {
      toast.error(error);
    }
  };

  console.log("food details", food?.reviews);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductImages
              images={[
                {
                  src: food.imageUrl || "https://placehold.co/600x400",
                  srcset: food.imageUrl || "https://placehold.co/600x400",
                  alt: food.name || "food image",
                  width: 600,
                  height: 400,
                  sizes: "100vw",
                },
              ]}
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {food.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <Reviews
                      rate={PRODUCT_DETAILS.reviews.rate}
                      totalReviewers={PRODUCT_DETAILS.reviews.totalReviewers}
                    />
                    <Badge variant="secondary">
                      <CircleCheck />
                      {food.isAvailable ? "ready to order" : "closed"}
                    </Badge>
                  </div>
                </div>
                <Price
                  regular={food.price}
                  sale={food.discountPrice}
                  currency="BDT"
                />
              </div>
              <p></p>
              <p>
                <span className="font-bold">Dietary Tags: </span>
                {food.dietary_tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </p>
              <p className="text-muted-foreground">{food.description}</p>
              <p>Preparation time: {food.prepTimeMinutes} minutes</p>
            </div>

            <div className="container mx-auto">
              <p className="text-center font-bold my-1">Quantity</p>
              <div className="flex items-center justify-center gap-2">
                <Button
                  disabled={quantity === 1}
                  onClick={() => handleQuantity("decrement")}
                >
                  -
                </Button>
                {quantity}
                <Button onClick={() => handleQuantity("increment")}>+</Button>
              </div>
            </div>

            <Button
              disabled={sessionData?.user?.roles !== "Customer"}
              onClick={() => handleCreateOrder()}
              size="lg"
              className="w-full"
            >
              Add to Cart
            </Button>

            <ProductInfo
              info={[
                {
                  label: "Payment Method",
                  value: "Cash on delivery",
                },
                {
                  label: "total Price",
                  value: totalPrice.toString(),
                },
              ]}
            />

            <div>
              {food?.reviews?.map((review) => (
                <ItemGroupExample key={review.id} reviews={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductInfo = ({ info }: ProductInfoProps) => {
  if (!info) return;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Food Details</h2>
      <dl>
        {info.map((item, index) => (
          <div
            key={`product-detail-1-info-${index}`}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <dt className="text-sm font-medium text-muted-foreground">
              {item.label}
            </dt>
            <dd className="text-sm font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <Carousel
      opts={{
        breakpoints: {
          "(min-width: 768px)": {
            active: false,
          },
        },
      }}
    >
      <CarouselContent className="gap-4 md:m-0 md:grid md:grid-cols-3 xl:gap-5">
        {images.map((img, index) => (
          <CarouselItem
            className="first:col-span-3 md:p-0"
            key={`product-detail-1-image-${index}`}
          >
            <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
              <img
                srcSet={img.srcset}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes={img.sizes}
                className="block size-full object-cover object-center"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="md:hidden">
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </div>
    </Carousel>
  );
};

const Reviews = ({ rate, totalReviewers }: ReviewsProps) => {
  const renderStars = () => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`product-detail-1-star-full-${i}`}
          className="size-4 fill-yellow-500 stroke-yellow-500"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="product-detail-1-half-star" className="relative size-4">
          <StarHalf className="absolute top-0 right-0 size-full fill-yellow-500 stroke-yellow-500" />
          <StarHalf className="absolute top-0 left-0 size-full -scale-x-100 fill-black/15 stroke-black/15 dark:invert" />
        </div>,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`product-detail-1-star-empty-${i}`}
          className="size-4 fill-black/15 stroke-black/15 dark:invert"
        />,
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">{renderStars()}</div>
      {totalReviewers && (
        <p className="text-base leading-none font-medium whitespace-nowrap text-muted-foreground">
          {totalReviewers} reviews
        </p>
      )}
    </div>
  );
};

const formSchema = z.object({
  color: z.string(),
  quantity: z.number().min(1),
  size: z.string(),
});

const ProductForm = ({ hinges, selected }: ProductFormProps) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: selected?.color,
      size: selected?.size,
      quantity: selected?.quantity,
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  const sizeHinges = hinges?.size;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {sizeHinges && (
        <Controller
          control={form.control}
          name={sizeHinges.name}
          render={({ field }) => (
            <Field>
              <FieldLabel className="text-base font-semibold" asChild>
                <h2>{sizeHinges.label}</h2>
              </FieldLabel>
              <SizeRadioGroup field={field} options={sizeHinges.options} />
            </Field>
          )}
        />
      )}
    </form>
  );
};

const Price = ({ regular, sale, currency }: PriceProps) => {
  if (!regular || !currency) return;

  const formatCurrency = (
    value: number,
    currency: string = "BDT",
    locale: string = "en-US",
  ) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  };

  return (
    <div className="flex items-center gap-2">
      {sale && (
        <span className="text-right text-2xl font-bold text-primary">
          {formatCurrency(sale, currency)}
        </span>
      )}
      <span
        className={`text-right text-2xl font-bold ${
          sale ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {formatCurrency(regular, currency)}
      </span>
    </div>
  );
};

const SizeRadioGroup = ({ options, field }: RadioGroupProps) => {
  if (!options) return;

  return (
    <RadioGroup
      {...field}
      value={`${field.value}`}
      onValueChange={(value) => {
        if (value != field.value && value) {
          field.onChange(value);
        }
      }}
      className="flex flex-wrap gap-3"
    >
      {options &&
        options.map((item, index) => (
          <Field key={`product-detail-1-size-input-${index}`}>
            <SizeOption
              stockInfo={item.stockInfo}
              id={item.id}
              label={item.label}
              value={item.value}
            />
          </Field>
        ))}
    </RadioGroup>
  );
};

const SizeOption = ({ id, label, stockInfo, value }: SizeOptionProps) => {
  const isOutOfStock = stockInfo.stockStatusCode === "OUT_OF_STOCK";

  return (
    <FieldLabel
      htmlFor={id}
      className="relative flex h-10 w-16 cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground has-checked:bg-primary has-checked:text-primary-foreground has-disabled:pointer-events-none has-disabled:opacity-50"
    >
      <RadioGroupItem
        id={id}
        className="sr-only"
        value={value}
        disabled={isOutOfStock}
      />
      <span className="uppercase">{label}</span>
      {isOutOfStock && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full rotate-45 bg-border"></div>
        </div>
      )}
    </FieldLabel>
  );
};

export { ProductDetail1 };
