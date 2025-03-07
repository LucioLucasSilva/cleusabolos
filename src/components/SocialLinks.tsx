import { Instagram, Facebook, MessageCircle as WhatsApp } from 'lucide-react';

interface SocialLinksProps {
  instagram: string;
  facebook: string;
  whatsapp: string;
}

export default function SocialLinks({ instagram, facebook, whatsapp }: SocialLinksProps) {
  return (
    <div className="flex gap-4">
      <a
        href={`https://instagram.com/${instagram.replace('@', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-800 hover:text-[#E1306C] transition-colors"
        aria-label="Instagram"
      >
        <Instagram className="w-8 h-8" />
      </a>
      <a
        href={`https://facebook.com/${facebook}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-800 hover:text-[#1877F2] transition-colors"
        aria-label="Facebook"
      >
        <Facebook className="w-8 h-8" />
      </a>
      <a
        href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-800 hover:text-[#25D366] transition-colors"
        aria-label="WhatsApp"
      >
        <WhatsApp className="w-8 h-8" />
      </a>
    </div>
  );
}