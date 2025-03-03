import { FeaturedContent, SecondaryContent } from "@/data/cms/Home";
import "./(frontend)/home.css";
export default function Home() {
  return (
    <>
      <div className="divide-x-thick grid w-full overflow-hidden sm:grid-cols-2">
        <div className="col-span-1 flex aspect-square flex-col justify-end border-b-4 bg-black bg-[url('/api/images/zigzag?width=500&height=500&tileScaleX=10&tileScaleY=5')] bg-repeat transition-all duration-500 sm:aspect-auto">
          <p className="bg-black/50 px-2 py-4 text-xs font-medium tracking-wide text-white uppercase">
            Quilt Title
          </p>
        </div>
        <div className="@container col-span-1 border-b-4 p-4">
          <FeaturedContent />
        </div>
      </div>
      <div className="divide-x-thick grid w-full overflow-hidden sm:grid-cols-2">
        <div className="@container col-span-1 border-b-4 p-4">
          <SecondaryContent />
        </div>
        <div className="col-span-1 flex aspect-square flex-col justify-end border-b-4 bg-black bg-[url('/api/images/zigzag?width=600&height=600&tileScaleX=20&tileScaleY=10')] bg-repeat transition-all duration-500">
          <p className="bg-black/50 px-2 py-4 text-xs font-medium tracking-wide text-white uppercase">
            Quilt Title
          </p>
        </div>
      </div>
    </>
  );
}
