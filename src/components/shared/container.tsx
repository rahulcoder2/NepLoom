import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("container max-w-7xl relative mx-auto px-4 ", className)}
    >
      {children}
    </div>
  );
};

export default Container;
