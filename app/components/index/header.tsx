export default function Header() {
    return (
      <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
        <div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
        
        <div className="relative mx-auto max-w-container">
          <nav className="flex items-center justify-between py-4">
            
            {/* Left side navigation */}
            <nav className="flex items-center gap-4 justify-start">
              <a
                href="https://dollarlabs.io"
                className="flex items-center gap-2 text-xl font-bold text-white"
              >
                Ratings
              </a>
              
              <nav
                aria-label="Main"
                data-orientation="horizontal"
                dir="ltr"
                className="relative z-10 max-w-max flex-1 items-center justify-center hidden md:flex"
              >
                <div style={{ position: "relative" }}>
                  <ul
                    data-orientation="horizontal"
                    className="group flex flex-1 list-none items-center justify-center space-x-1"
                    dir="ltr"
                  >
                    <li>
                      <a
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        href="https://help.dollarlabs.io/"
                      >
                        Documentation
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="absolute left-0 top-full flex justify-center"></div>
              </nav>
            </nav>
            
            {/* Right side navigation */}
            <nav className="flex items-center gap-4 justify-end">
              <a
                href="https://apps.shopify.com/dollar-discounts"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:from-primary/80 hover:to-primary/70 bg-gradient-to-b from-primary/90 to-primary/80 border-t-primary z-1 h-9 px-4 py-2"
              >
                Get Started
              </a>
              
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 shrink-0 md:hidden"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:Ragpucq:"
                data-state="closed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
                <span className="sr-only">Toggle navigation menu</span>
              </button>
            </nav>
          </nav>
        </div>
      </header>
    );
  }
  