export type MenuCategorySlug =
  | "hamisi"
  | "soslu-toyuqlar"
  | "makarnalar"
  | "tantuni"
  | "tostlar"
  | "menemen"
  | "ickiler";

export type MenuItem = {
  id: string;
  category: MenuCategorySlug;
  title: string;
  description: string;
  price: string;
  image: string;
  isPopular?: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  // Soslu Toyuqlar
  {
    id: "kori-soslu-toyuq",
    category: "soslu-toyuqlar",
    title: "Köri Soslu Toyuq",
    description:
      "Yüngül acılı köri sousunda, krema və tərəvəzlərlə qaynadılmış toyuq parçaları. Jasmin düyü ilə servis.",
    price: "12.5 ₼",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    isPopular: true,
  },
  {
    id: "toyuq-cokertme",
    category: "soslu-toyuqlar",
    title: "Toyuq Çökertmə",
    description:
      "Xırda doğranmış kartof yatağı üzərində ızgara toyuq, süzgəc qatığı və xüsusi qırmızı sos.",
    price: "13 ₼",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    isPopular: true,
  },
  {
    id: "cafe-de-paris-toyuq",
    category: "soslu-toyuqlar",
    title: "Cafe de Paris Soslu Toyuq",
    description:
      "Kərə yağı, otlar və gizli ədviyyatlarla hazırlanan cafe de paris sousunda, ızgara toyuq filesi.",
    price: "14 ₼",
    image:
      "https://images.unsplash.com/photo-1625944230946-11c8ab40b434?w=800&q=80",
    isPopular: false,
  },
  {
    id: "mexican-toyuq",
    category: "soslu-toyuqlar",
    title: "Mexican Toyuq",
    description:
      "Acılı Meksika sousu, qarğıdalı, bibər və qara lobya ilə sotelenmiş toyuq. Lavaş ilə birlikdə.",
    price: "13.5 ₼",
    image:
      "https://images.unsplash.com/photo-1608038509085-9d2b9293f5a1?w=800&q=80",
    isPopular: false,
  },

  // Makarnalar
  {
    id: "fettucine-alfredo",
    category: "makarnalar",
    title: "Fettuccine Alfredo",
    description:
      "Kremalı parmesan sousu, kərə yağı və təzə üyüdülmüş qara istiot ilə klassik italyan ləzzəti.",
    price: "10.5 ₼",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80",
    isPopular: true,
  },
  {
    id: "napoliten-makarna",
    category: "makarnalar",
    title: "Napoliten Makarna",
    description:
      "Pomidor, sarımsaq, reyhan və zeytun yağı ilə hazırlanan yüngül və ətirli sous.",
    price: "9.5 ₼",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80",
    isPopular: false,
  },

  // Tantuni
  {
    id: "yogurtlu-tantuni",
    category: "tantuni",
    title: "Yoğurtlu Tantuni",
    description:
      "Lavaş üzərində dana tantuni, bol qatıq, kərə yağı və xüsusi ədviyyat qarışığı.",
    price: "11.5 ₼",
    image:
      "https://images.unsplash.com/photo-1608038509085-9d2b9293f5a1?w=800&q=80",
    isPopular: true,
  },
  {
    id: "durum-tantuni",
    category: "tantuni",
    title: "Dürüm Tantuni",
    description:
      "İnce lavaşa bükülmüş, bol ədviyyatlı dana tantuni. Soğan, cəfəri və limon ilə.",
    price: "10 ₼",
    image:
      "https://images.unsplash.com/photo-1544022613-8eedcdb3e768?w=800&q=80",
    isPopular: false,
  },
  {
    id: "corekde-tantuni",
    category: "tantuni",
    title: "Çörəkdə Tantuni",
    description:
      "Xırtıldayan çörək arasında dana tantuni, göyərti və turşu ilə İstanbul üslubu.",
    price: "10.5 ₼",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    isPopular: false,
  },

  // Tostlar
  {
    id: "kasarli-tost",
    category: "tostlar",
    title: "Kaşarlı Tost",
    description:
      "Xırtıldayan çörək arasında bol ərimiş kaşar pendiri. Sadə və nostaljik bir ləzzət.",
    price: "6 ₼",
    image:
      "https://images.unsplash.com/photo-1559466273-d95e72debaf8?w=800&q=80",
    isPopular: false,
  },
  {
    id: "karisik-tost",
    category: "tostlar",
    title: "Karıxık Tost",
    description:
      "Sucuk, kaşar və pomidor ilə dolu, doyurucu və istəkartı tost seçimi.",
    price: "7.5 ₼",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    isPopular: true,
  },

  // Menemen
  {
    id: "sade-menemen",
    category: "menemen",
    title: "Sadə Menemen",
    description:
      "Təzə pomidor, bibər və yumurta ilə hazırlanan klassik menemen. Səhər yeməyi üçün ideal.",
    price: "7 ₼",
    image:
      "https://images.unsplash.com/photo-1512058454905-6c8f84636aa9?w=800&q=80",
    isPopular: false,
  },
  {
    id: "kasarli-menemen",
    category: "menemen",
    title: "Kaşarlı Menemen",
    description:
      "Ərimiş kaşar ilə daha kremalı, daha doyurucu menemen versiyası.",
    price: "8 ₼",
    image:
      "https://images.unsplash.com/photo-1625944230946-11c8ab40b434?w=800&q=80",
    isPopular: true,
  },

  // İçkilər
  {
    id: "kola",
    category: "ickiler",
    title: "Kola",
    description: "33 cl şüşə və ya qutu kola.",
    price: "3 ₼",
    image:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80",
    isPopular: false,
  },
  {
    id: "fanta",
    category: "ickiler",
    title: "Fanta",
    description: "Portağal aromalı qazlı içki, 33 cl.",
    price: "3 ₼",
    image:
      "https://images.unsplash.com/photo-1600272507114-4e24af1c422f?w=800&q=80",
    isPopular: false,
  },
  {
    id: "ayran",
    category: "ickiler",
    title: "Ayran",
    description: "Klassik soyuq ayran. Tantuni və ızgaralar ilə mükəmməl gedir.",
    price: "2.5 ₼",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
    isPopular: true,
  },
  {
    id: "kompot",
    category: "ickiler",
    title: "Kompot",
    description:
      "Mövsüm meyvələrindən ev usulu kompot. Şəkəri balanslı, yüngül və təravətli.",
    price: "2.5 ₼",
    image:
      "https://images.unsplash.com/photo-1535068485641-6b2c02c9f56e?w=800&q=80",
    isPopular: false,
  },
  {
    id: "meyve-suyu",
    category: "ickiler",
    title: "Meyvə Suyu",
    description: "Portağal, alma və qarışıq meyvə seçimləri ilə 100% meyvə suyu.",
    price: "3 ₼",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80",
    isPopular: false,
  },
];

