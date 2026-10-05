import { Heart, Sparkle, Star } from "@/components/doodles";

/** Estallido de garabatos para los momentos buenos (billetera lista, pago enviado). */
export function Celebrate() {
  const pieces = [Sparkle, Star, Heart, Sparkle, Star, Sparkle];
  return (
    <div className="celebrate" aria-hidden="true">
      {pieces.map((Piece, index) => (
        <Piece key={index} className={`celebrate-piece celebrate-${index + 1}`} />
      ))}
    </div>
  );
}
