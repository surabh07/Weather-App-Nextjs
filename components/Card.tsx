import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <section className="bg-[#0f1724] rounded-2xl p-5 shadow-lg">
      {title && (
        <h2 className="mb-4 text-xs font-semibold tracking-widest text-gray-400">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export default Card;
