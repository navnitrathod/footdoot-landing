// Icon library: lucide-react. We re-export under stable local names so the rest
// of the app imports from one place. The brand Logo uses /public/logo.svg.
import Image from "next/image";
import {
  Search as LSearch,
  Heart as LHeart,
  ShoppingCart,
  User as LUser,
  ScanLine,
  PlayCircle,
  ChevronRight as LChevronRight,
  ChevronLeft as LChevronLeft,
  Star as LStar,
  Package,
  Tag,
  ShieldCheck,
  Lock,
  Truck,
  RefreshCw,
  Headset,
  Zap,
  MapPin,
  type LucideProps,
} from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Image src="/logo.svg" alt="Footdoot" width={48} height={48} className={className} priority />
);

export const Search = (p: LucideProps) => <LSearch {...p} />;
export const Heart = (p: LucideProps) => <LHeart {...p} />;
export const Cart = (p: LucideProps) => <ShoppingCart {...p} />;
export const User = (p: LucideProps) => <LUser {...p} />;
export const Scan = (p: LucideProps) => <ScanLine {...p} />;
export const Play = (p: LucideProps) => <PlayCircle {...p} />;
export const ChevronRight = (p: LucideProps) => <LChevronRight {...p} />;
export const ChevronLeft = (p: LucideProps) => <LChevronLeft {...p} />;
export const Box = (p: LucideProps) => <Package {...p} />;

// Stars render filled by default (ratings / reviews).
export const Star = (p: LucideProps) => (
  <LStar fill="currentColor" strokeWidth={0} {...p} />
);

const FEATURE_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  tag: Tag,
  shield: ShieldCheck,
  lock: Lock,
  truck: Truck,
  rotate: RefreshCw,
  headset: Headset,
  bolt: Zap,
  pin: MapPin,
};

export const FeatureIcon = ({
  name,
  ...p
}: { name: string } & LucideProps) => {
  const Cmp = FEATURE_ICONS[name] ?? Package;
  return <Cmp {...p} />;
};
