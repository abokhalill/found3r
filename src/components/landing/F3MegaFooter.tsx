"use client";

export function F3MegaFooter() {
  return (
    <footer className="relative border-t border-white/5" style={{ backgroundColor: '#0B0C0E' }}>
      <div className="w-full max-w-7xl mx-auto px-6 py-16">
        
        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Platform */}
          <div>
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Validation
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Boilerplates
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Deployment
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Manifesto
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Founders Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors inline-flex items-center gap-2">
                  Open Startup
                  <span className="text-[12px] px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-400">
                    Metrics
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  AI Ethics Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-[12px] font-bold text-white">F3</span>
            </div>
            <span className="text-[15px] font-medium text-[#EDEDED]">Found3r</span>
          </div>

          {/* Center: Copyright (Mobile Hidden) */}
          <div className="hidden md:block text-[12px] text-[#8A8F98]">
            © 2024 Found3r. All rights reserved.
          </div>

          {/* Right: System Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/5 border border-green-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[12px] text-green-400 font-medium">System Status: All Agents Online</span>
          </div>

        </div>

        {/* Mobile Copyright */}
        <div className="md:hidden text-center mt-4 text-[12px] text-[#8A8F98]">
          © 2024 Found3r. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
