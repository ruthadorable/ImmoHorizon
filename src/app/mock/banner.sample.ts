import { HomepageBanner } from "../models/banner.model";
export const banners: HomepageBanner[] = [
  {
    id: 1,
    title: "Le bien de vos rêves est peut-être ici",
    subtitle: "Achetez, vendez ou louez en toute confiance",
    description:
      "Explorez nos annonces immobilières et trouvez le logement qui correspond à votre style de vie, à vos besoins et à votre budget.",
    image: "./images/properties/src_BZPAAP11693_315262_V0_CEFF.jpg",
    buttonText: "Rechercher un bien",
    buttonLink: "/properties",
    secondaryButtonText: "Estimer mon bien",
    secondaryButtonLink: "/estimation",
    active: true
  },
  {
    id: 2,
    title: "Votre projet immobilier, notre expertise",
    subtitle: "Des propriétés sélectionnées avec soin",
    description:
      "Que vous souhaitiez acheter, vendre ou louer, ImmoHorizon vous accompagne à chaque étape pour concrétiser votre projet immobilier en toute sérénité.",
    image: "./images/properties/src_BZPAAP11693_315262_V0_CEFF.jpg",
    buttonText: "Découvrir nos propriétés",
    buttonLink: "/properties",
    secondaryButtonText: "Parler à un conseiller",
    secondaryButtonLink: "/contact",
    active: true
  }
];