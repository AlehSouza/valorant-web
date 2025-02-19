"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface BannerContextProps {
  title: Title['titleText'];
  titles: Title[];

  card: Card['largeArt'];
  cards: Card[];

  tier: Tier['largeIcon'];
  tiers: Tier[];

  wallpaper: string;
  wallpapers: string[];

  setTitle: (title: string) => void;
  setTitles: (titles: Title[]) => void;

  setCard: (card: string) => void;
  setCards: (cards: Card[]) => void;

  setTier: (tier: string) => void;
  setTiers: (tiers: Tier[]) => void;

  setWallpaper: (wallpaper: Wallpaper) => void;
  setWallpapers: (wallpapers: Wallpaper[]) => void;

  handleGenerateRandom: () => void
}

interface BannerProviderProps {
  children: React.ReactNode;
}

const BannerContext = createContext<BannerContextProps>(
  {} as BannerContextProps
);

const BannerProvider = ({ children }: BannerProviderProps) => {
  
  const [title, setTitle] = useState<Title['titleText']>('')
  const [titles, setTitles] = useState<Title[]>([])

  const [card, setCard] = useState<Card['largeArt']>('');
  const [cards, setCards] = useState<Card[]>([]);

  const [tier, setTier] = useState<Tier['largeIcon']>('');
  const [tiers, setTiers] = useState<Tier[]>([]);

  const [wallpaper, setWallpaper] = useState<any>('');
  const [wallpapers, setWallpapers] = useState<any[]>([]);

  useEffect(() => {}, []);

  const handleGenerateRandom = () => {
      // Cards
      var randomIndex = Math.floor(Math.random() * cards.length);
      setCard(cards[randomIndex].largeArt)

      // Tier
      do {
          var randomIndex = Math.floor(Math.random() * tiers.length);
          if (tiers[randomIndex].tierName.startsWith("Unused")) {
              continue
          }
          break
      } while (true)
      setTier(tiers[randomIndex].largeIcon)

      // Title
      var randomIndex = Math.floor(Math.random() * titles!.length);
      setTitle(titles![randomIndex].titleText)

      // Wallpaper
      var randomIndex = Math.floor(Math.random() * wallpapers.length);
      setWallpaper(wallpapers[randomIndex].image)
  }

  return (
    <BannerContext.Provider
      value={{
        title,
        titles,

        card,
        cards,

        tier,
        tiers,

        wallpaper,        
        wallpapers,

        setTitle,
        setTitles,

        setCard,
        setCards,

        setTier,
        setTiers,

        setWallpaper,
        setWallpapers,

        handleGenerateRandom
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

const useBanner = () => {
  const context = useContext(BannerContext);

  if (!context) {
    throw new Error("useBanner must be used within a BannerContextProvider");
  }

  return context;
};

export { BannerProvider, useBanner };
