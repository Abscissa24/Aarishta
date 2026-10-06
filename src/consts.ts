import type { Site, Links } from "@/types";

export const SITE: Site = {
  TITLE: "Athena",
  DESCRIPTION: "Aarishta Pillay's personal website",
  AUTHOR: "Athena",
};

// Shared with BaseHead (which preloads it) so the URL only lives in one
// place instead of having to stay in sync between the two files.
export const AVATAR_URL = `${import.meta.env.BASE_URL}Assets/Avatar/Profile.webp`;

export const RESUME_URL = `${import.meta.env.BASE_URL}Assets/Media/AarishtaP-Resume.pdf`;

const BASE = import.meta.env.BASE_URL;

export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: BASE,
  },
  {
    TEXT: "About",
    HREF: `${BASE}about/`,
  },
  {
    TEXT: "Projects",
    HREF: `${BASE}projects/`,
  },
];
