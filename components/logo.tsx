import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <>
      {!light ? (
        <Link className={`logo ${light ? "logo--light" : ""}`} href="/#inicio" aria-label="Pão Nosso, início">
          <Image className="logo" src="/images/logo.svg" alt="Pão Nosso" width={180} height={80} priority />
        </Link>
      ) : (
        <Link className={`logo ${light ? "logo--light" : ""}`} href="/#inicio" aria-label="Pão Nosso, início">
          <Image className="logo" src="/images/logo2.svg" alt="Pão Nosso" width={180} height={80} priority />
        </Link>
      )}
    </>
  );
}
