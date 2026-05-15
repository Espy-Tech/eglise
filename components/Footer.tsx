'use client';

import Link from 'next/link';
import { Github, Mail, Linkedin } from 'lucide-react';
import { COLORS } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg"
                style={{ background: COLORS.gradientPrimary }}
              />
              <span className="font-bold text-white">NumIntegral</span>
            </div>
            <p className="text-sm text-gray-400">
              Premium scientific platform for numerical integration analysis.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Product',
              links: [{ label: 'Features', href: '#' }, { label: 'Analytics', href: '/analytics' }],
            },
            {
              title: 'Resources',
              links: [
                { label: 'Documentation', href: '/documentation' },
                { label: 'Methodology', href: '/methodology' },
              ],
            },
            {
              title: 'Company',
              links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '#' }],
            },
          ].map((group, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-white mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Numerical Integration Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[{ icon: Github }, { icon: Linkedin }, { icon: Mail }].map((social, idx) => {
              const Icon = social.icon;
              return (
                <button key={idx} className="text-gray-400 hover:text-white transition-colors">
                  <Icon size={20} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;