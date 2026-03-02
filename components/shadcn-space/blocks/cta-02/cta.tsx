import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface CTAProps {
    marqueeItems?: string[];
}

const defaultMarqueeItems = [
    "Deliciously Delivered. Happily Shared.",
    "Because the Best Part of Your Day Shouldn't Be Spent in the Kitchen—It Should Be Spent Together Over a Meal You Both Love.",
    "From the Sizzle of the Pan to the Smile on Their Face: Delivering the Fresh, Restaurant-Quality Flavors That Make Every Date Night Feel Like a Celebration!",
    "There’s a Specific Kind of Joy That Only Comes After the Perfect Last Bite—And We’re Dedicated to Delivering That Feeling to Your Door, Every Single Time.!",
];

const CTA: React.FC<CTAProps> = ({ marqueeItems = defaultMarqueeItems }) => {
    return (
<section>
    <div className='max-w-7xl mx-auto sm:px-16 px-4 sm:py-20 py-8'>
        {/* The container must be relative and overflow-hidden to clip the glass and video */}
        <div className="relative rounded-2xl overflow-hidden min-h-[500px] flex flex-col justify-between border border-white/10">
            
            {/* 1. Background Video */}
            <video
                className="absolute top-0 left-0 -z-10 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="https://www.pexels.com/download/video/6412410/" type="video/mp4" />
            </video>

            {/* 2. Dark Overlay (Helps white text pop) */}
            <div className="absolute inset-0 bg-black/20 -z-10" />

            {/* 3. Main Hero Content */}
            <div className="flex-grow flex items-center justify-center py-16 px-10">
                <div className="flex flex-col items-center gap-8">
                    <h2 className='text-white sm:text-5xl text-3xl max-w-2xl text-center font-bold drop-shadow-2xl'>
                        Love at First Bite. <br/> Happiness in Every Box.
                    </h2>
                    <Link href="/allFood" className='bg-white py-3.5 px-8 rounded-full text-black hover:scale-105 duration-300 font-semibold shadow-lg'>
                        Order Now
                    </Link>
                </div>
            </div>

            {/* 4. THE GLASS MARQUEE - This is the part you wanted */}
            <div className="w-full py-5 bg-white/10 backdrop-blur-xl border-t border-white/20">
                <Marquee className="[--duration:40s] [--gap:2rem] p-0" pauseOnHover>
                    {marqueeItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-6">
                            <p className='text-white/90 whitespace-nowrap text-sm font-medium tracking-wide uppercase'>
                                {item}
                            </p>
                            {/* Bullet or separator */}
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    </div>
</section>
    );
};

export default CTA;
