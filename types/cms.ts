// CMS Header Types
export interface Logo {
    dark: string;
    light: string;
    alt: string;
}

export interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
    instructor: string;
}

export interface Cart {
    itemCount: number;
    href: string;
    items: CartItem[];
}

export interface SearchResult {
    id: number;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviewCount: number;
}

export interface SearchConfig {
    placeholder: string;
    buttonText: string;
    resultsPerPage: number;
    mockResults: SearchResult[];
}

export interface NavigationLink {
    text: string;
    href: string;
    icon: string;
    description: string;
    badge?: string;
}

export interface Submenu {
    title: string;
    icon: string;
    links: NavigationLink[];
}

export interface FeaturedCourse {
    title: string;
    description: string;
    image: string;
    href: string;
    badge: string;
}

export interface MenuItem {
    title: string;
    href?: string;
    hasDropdown: boolean;
    icon: string;
    description?: string;
    featured?: FeaturedCourse;
    submenus?: Submenu[];
}

export interface Navigation {
    menuItems: MenuItem[];
}

export interface UserProfile {
    name: string;
    email: string;
    avatar: string;
    avatarFallback: string;
    profileLink: string;
}

export interface UserMenuItem {
    icon: string;
    text: string;
    href: string;
    description: string;
}

export interface UserMenuLink {
    icon: string;
    text: string;
    href: string;
}

export interface UserMenu {
    profile: UserProfile;
    isLoggedIn: boolean;
    menuItems: UserMenuItem[];
    supportLinks: UserMenuLink[];
    settingsLinks: UserMenuLink[];
}

export interface CallToAction {
    text: string;
    href: string;
    variant: string;
}

export interface HeaderNavigation {
    _id?: string;
    logo: Logo;
    cart: Cart;
    search: SearchConfig;
    navigation: Navigation;
    userMenu: UserMenu;
    cta: CallToAction;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// CMS Top Bar Types
export interface SocialStat {
    platform: string;
    href: string;
    count: string;
    label?: string;
}

export interface Language {
    code: string;
    name: string;
    flag: string;
}

export interface Currency {
    code: string;
    name: string;
}

export interface NewsAnnouncement {
    badge: string;
    text: string;
    icon: string;
}

export interface SocialLink {
    platform: string;
    href: string;
}

export interface TopBar {
    _id?: string;
    socialStats: SocialStat[];
    languages: Language[];
    currencies: Currency[];
    news: NewsAnnouncement;
    socialLinks: SocialLink[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: {
        timestamp: string;
        path: string;
        method: string;
    };
}
