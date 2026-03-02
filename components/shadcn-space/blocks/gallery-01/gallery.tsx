import { Card } from "@/components/ui/card";

const Gallery = () => {
  return (
    <>
      <div className="lg:py-20 sm:py-16 py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 py-10 w-full">
          <h1 className="text-2xl font-bold text-black text-center py-3">Moment Shared by Our happy Customer</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* LEFT – Large card */}
            
            <Card className="group relative  overflow-hidden rounded-lg border-none p-0 ">
              <img
                src="https://raw.githubusercontent.com/asif12018/image/main/customer4.jpeg"
                alt="Hiking Adventure"
                className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
              />
              {/* <div className="absolute inset-0 bg-black/30" /> */}
              <div className="absolute bottom-0 ps-8 pb-8 z-10 flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-white">
                  Make her Every Moment Special
                </h3>
                <p className="text-white/80 text-sm">For perfect Date</p>
              </div>
            </Card>

            {/* RIGHT SIDE */}
            <div className="grid grid-rows-2 gap-6">
              {/* Top wide card */}
              <Card className="group relative  overflow-hidden rounded-lg border-none p-0 ">
                <img
                  src="https://raw.githubusercontent.com/asif12018/image/main/customer-image-01.png"
                  alt="Outdoor Adventure"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
                />

                <div className="absolute bottom-0 ps-8 pb-8 z-10 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-white">
                    Bring smile to someone's face
                  </h3>
                  <p className="text-white/80">For perfect Gift</p>
                </div>
              </Card>

              {/* Bottom two cards */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="group relative  overflow-hidden rounded-lg border-none p-0">
                  <img
                    src="https://raw.githubusercontent.com/asif12018/image/main/customer3.jpeg"
                    alt="Beach Adventure"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
                  />

                  <div className="absolute bottom-0 ps-8 pb-8 z-10 flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-white">
                      Celebrate evey moment
                    </h3>
                    <p className="text-sm text-white/80">we are here for you</p>
                  </div>
                </Card>

                <Card className="group relative  overflow-hidden rounded-lg border-none p-0">
                  <img
                    src="https://raw.githubusercontent.com/asif12018/image/main/customer5.png"
                    alt="Pilgrimage Destination"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
                  />

                  <div className="absolute bottom-0 ps-8 pb-8 z-10 flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-white">
                       Get 10% discount on ifter items
                    </h3>
                    <p className="text-sm text-white/80">order now</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
