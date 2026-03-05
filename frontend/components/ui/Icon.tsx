'use client';

// If using React Icons
import { 
  FiShoppingCart, 
  FiUser, 
  FiSearch, 
  FiHeart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHome,
  FiInfo,
  FiMail,
  FiHelpCircle,
  FiLogIn,
  FiLogOut,
  FiUserPlus,
  FiPackage,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiCheck,
  FiArrowRight,
  FiCreditCard,
  FiTruck,
  FiStar,
  FiFilter
} from 'react-icons/fi';

// Icon name type for type safety
export type IconName = 
  | 'cart'
  | 'user'
  | 'search'
  | 'heart'
  | 'menu'
  | 'close'
  | 'chevronDown'
  | 'home'
  | 'info'
  | 'mail'
  | 'help'
  | 'login'
  | 'logout'
  | 'signup'
  | 'package'
  | 'trash'
  | 'plus'
  | 'minus'
  | 'check'
  | 'arrowRight'
  | 'creditCard'
  | 'truck'
  | 'star'
  | 'filter';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const iconMap = {
  cart: FiShoppingCart,
  user: FiUser,
  search: FiSearch,
  heart: FiHeart,
  menu: FiMenu,
  close: FiX,
  chevronDown: FiChevronDown,
  home: FiHome,
  info: FiInfo,
  mail: FiMail,
  help: FiHelpCircle,
  login: FiLogIn,
  logout: FiLogOut,
  signup: FiUserPlus,
  package: FiPackage,
  trash: FiTrash2,
  plus: FiPlus,
  minus: FiMinus,
  check: FiCheck,
  arrowRight: FiArrowRight,
  creditCard: FiCreditCard,
  truck: FiTruck,
  star: FiStar,
  filter: FiFilter,
};

export default function Icon({ name, size = 20, className = '', onClick }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      className={`${className} inline-block`}
      onClick={onClick}
    />
  );
}