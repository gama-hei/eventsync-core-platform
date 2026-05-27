"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterFooter() {
  return (
    <div className="border-t border-slate-800 pt-12 mt-20 pb-6 text-gray-400 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="max-w-md text-center md:text-left">
          <h3 className="text-white font-bold text-lg mb-2">Join our newsletter to get latest updates about conference.</h3>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2 bg-[#1e232a] p-1.5 rounded-lg border border-slate-800">
          <Input type="email" placeholder="Your email address" className="bg-transparent border-0 text-white focus-visible:ring-0 placeholder:text-gray-500" />
          <Button type="submit" className="bg-[#ff4655] hover:bg-[#e03e4b] text-white rounded-md text-xs px-4">Subscribe</Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center text-xs gap-4">
        <p>© 2026 EventSync. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms & Conditions</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>
      </div>
    </div>
  );
}