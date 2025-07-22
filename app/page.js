import Gallery from "@/app/components/gallery";

export default function Home() {
  const tops = [
    { src: "/tshirt.png", alt: "t-shirt placeholder" },
    { src: "/sweater.png", alt: "sweater placeholder" },
  ];
  const bottoms = [
    { src: "/jeans.png", alt: "jeans placeholder" },
  ];
  return (
    <div className="items-center justify-items-center flex flex-col">
      <Gallery images={tops} />
      <Gallery images={bottoms} />
    </div>
  );
}
