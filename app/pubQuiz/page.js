import Image from "next/image";
import quizbillede from "@/public/images/PubQuizCopi.png";
import billede from "@/public/images/fyldtbarbillede.svg";

export default function PubQuiz() {
  return (
    <div>
      <section className="bg-linear-to-b from-transparent to-black/85">
        <Image
          width={400}
          height={400}
          src={billede}
          alt="bartender in bar"
          className="w-dvh h-auto  -z-10 relative"
        ></Image>
      </section>
      <div className="min-h-screen pb-10 px-5 flex items-center justify-center ">
        <main className="text-center max-w-[600px]">
          <h1 className="text-5xl font-heading text-center font-semibold mb-4 tracking-tight text-[#E5A702]">
            PUB QUIZ
          </h1>
          <p className="text-4xl font-heading text-center text-[#E5A702] mb-8 leading-tight">
            Join the fun, answer some hilarious questions, while enjoying you
            favourite drinks <br></br> AND win free drink vouchers (up to 250kr)
          </p>
          <p className="text-2xl font-body italic text-center text-[#FFF5D6] mb-8">
            How can you survive 30 days without sleep? or where does Superman
            usually go shopping?
          </p>
          <p className="text-2xl font-body text-center text-[#FFF5D6] mb-8">
            Such tricky and funny questions you will have to answer together
            with your friends or family in our PUB QUIZ in the Golden Lion.
          </p>
          <Image
            width={600}
            height={600}
            src={quizbillede}
            alt="Pub Quiz"
            className="mb-8 w-dvh h-auto"
          ></Image>
          <p className="text-2xl font-body text-center text-[#FFF5D6] mb-8">
            Every <strong>Friday</strong> at 20:00 - to start your weekend in
            the perfect way!
          </p>
          <p className="text-2xl font-body text-center text-[#FFF5D6] mb-8">
            Every <strong>Sunday</strong> at 19:45 - to end your weekend in an
            even better way
          </p>
        </main>
      </div>
    </div>
  );
}
