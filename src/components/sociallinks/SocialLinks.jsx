import { FaFacebook, FaInstagram, FaDiscord, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    icon: FaFacebook,
    href: "https://web.facebook.com/AnimeFocuse",
    color: "#1877F2",
    label: "Facebook"
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/animeofficialnew",
    color: "#E4405F",
    label: "Instagram"
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/your-number",
    color: "#25D366",
    label: "WhatsApp"
  },
  {
    icon: FaDiscord,
    href: "https://discord.gg/kKnrGVqkr7",
    color: "#7289DA",
    label: "Discord"
  }
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4 items-center justify-center">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110 p-2 rounded-full bg-white/10 backdrop-blur-sm"
          style={{ color: social.color }}
        >
          <social.icon size={24} />
        </a>
      ))}
    </div>
  );
}
