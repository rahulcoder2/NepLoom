import Container from "@/components/shared/container";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen ">
        <section className="hidden lg:flex xl:w-2/5 w-1/2 justify-center items-center p-6 bg-primary">
      <Container>
          <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-5 pt-20">
            <div className="space-y-2 text-white ">
              <h1 className="h1 font-inter">
                Shopping made simple, just for you.
              </h1>
              <p className="body-1">
                You&apos;re in the right place! Discover and purchase your top
                products without hassle.
              </p>
            </div>

            <Image
              src="/images/boarding.png"
              alt="files"
              width={320}
              height={320}
              priority
              className="object-contain w-full h-auto"
            />
          </div>
      </Container>
        </section>
        <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
          {children}
        </section>
    </div>
  );
};

export default AuthLayout;
