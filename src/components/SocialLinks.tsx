import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Dribbble, Bean as Behance, Pointer as Pinterest, Twitch, Disc as Discord, Atom as Tiktok, Snail as Snapchat, AlignJustify as Spotify, SunMedium as Medium, Timer as Vimeo, Dumbbell as Tumblr, Edit as Reddit, Wheat as Whatsapp, Instagram as Telegram } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.FC<{ size?: number; className?: string }>;
}

const socialLinks: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com/imdavidjenner', icon: Instagram },
  { name: 'Facebook', url: '#', icon: Facebook },
  { name: 'Twitter', url: '#', icon: Twitter },
  { name: 'LinkedIn', url: '#', icon: Linkedin },
  { name: 'YouTube', url: '#', icon: Youtube },
  { name: 'GitHub', url: '#', icon: Github },
  { name: 'Dribbble', url: '#', icon: Dribbble },
  { name: 'Behance', url: '#', icon: Behance },
  { name: 'Pinterest', url: '#', icon: Pinterest },
  { name: 'Twitch', url: '#', icon: Twitch },
  { name: 'Discord', url: '#', icon: Discord },
  { name: 'TikTok', url: '#', icon: Tiktok },
  { name: 'Snapchat', url: '#', icon: Snapchat },
  { name: 'Spotify', url: '#', icon: Spotify },
  { name: 'Medium', url: '#', icon: Medium },
  { name: 'Vimeo', url: '#', icon: Vimeo },
  { name: 'Tumblr', url: '#', icon: Tumblr },
  { name: 'Reddit', url: '#', icon: Reddit },
  { name: 'WhatsApp', url: '#', icon: Whatsapp },
  { name: 'Telegram', url: '#', icon: Telegram }
];

export function SocialLinks() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title={link.name}
          >
            <link.icon size={24} />
            <span className="sr-only">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialLinks;