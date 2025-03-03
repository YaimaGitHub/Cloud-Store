import Link from "next/link";
import Image from "next/image";
import showcase from "../../public/showcase.jpg";

const About = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900/50 text-center py-16">
      <div className="w-[min(1200px,100%-4rem)] mx-auto">
        <h2 className="text-5xl max-md:text-3xl font-bold mb-5">
        Desde un Start-up hasta ser el fabricante global
        </h2>
        <p className="text-lg text-gray-500 w-[min(1000px,100%)] mx-auto">
        Nuestra cultura corporativa se basa en un principio: Fundado en el Compromiso. Estamos orgullosos 
        de los productos que construimos con la ayuda de la experiencia de nuestros empleados, para garantizar 
        fiabilidad y la compatibilidad de los sitios web's. 
        Nuestros productos hacen posible el mundo de hoy y acercan el mundo del mañana.
        Estámos contigo a cada paso del camino
        </p>
      </div>

      <div className="mt-16">
        <Link href="https://shop-vert-eight.vercel.app/" target="_blank">
          <div className="w-[min(768px,100%-4rem)] aspect-video relative mx-auto shadow-md dark:shadow-white/20 group overflow-hidden rounded-xl hover:rounded-3xl transition-all hover:shadow-xl">
            <Image
              src="https://i.imgur.com/ORyce8n.jpeg"
              className="h-full w-full object-contain group-hover:scale-[1.02] transition-transform"
              alt="Illustration"
              priority
              placeholder="blur"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default About;
