import Image from "next/image";
import Link from "next/link";

export function TopLogo() {
  return (
    <Link href="/">
      <Image src="/assets/img/Lou-transparent-light.png" width={50} height={50} alt="Lou-Logo" priority />
    </Link>
  );
}

export function TopScrolledLogo() {
  return (
    <Link href="/">
      <Image src="/assets/img/Lou-transparent.png" width={40} height={40} alt="Lou-Logo" priority />
    </Link>
  );
}
