import clsx from "clsx";

export const Button = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={clsx(
      "bg-orange hover:shadow-none hover:ml-0 hover:mb-0 -ml-1 -mb-1 transition-all rounded-full p-2 text-base font-normal text-white button-backdrop border border-black",
      className
    )}
  >
    {children}
  </button>
);
