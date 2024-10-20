import Image from "next/image";

const services = [
  { src: "/images/Group 29.png", alt: "Service 1" },
  { src: "/images/Group 33.png", alt: "Service 2" },
  { src: "/images/Group 30.png", alt: "Service 3" },
  { src: "/images/Group 31.png", alt: "Service 4" },
  { src: "/images/Group 32.png", alt: "Service 5" },
];

const ServicesSection = () => {
  return (
    <div className="mt-10">
      <div className="max-w-[1270px] m-auto px-4 py-10 flex flex-col justify-between">
        <div className="flex flex-col text-center gap-4">
          <h2 className="text-[30px] font-semibold">
            What will you get if you join us?
          </h2>
          <p className="text-gray-400">
            We offer a wide range of services to help you manage your business
            more efficiently and effectively.
          </p>
        </div>
        <ul className="py-5 items-center gap-4 grid service mt-8">
          {services.map((service, index) => (
            <li key={index} className="grid place-content-center">
              <Image
                src={service.src}
                className="w-[100%] m-auto h-full"
                height={200}
                width={200}
                alt={service.alt}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServicesSection;
