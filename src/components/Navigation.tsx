import { Link } from '@tanstack/react-router';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LayoutDashboard, GalleryHorizontalEnd } from 'lucide-react';
import TemperatureToggle from '@/components/TemperatureToggle';

const Links = {
  '/': {
    text: 'Dashboard',
    icon: <LayoutDashboard strokeWidth="1" />,
  },
  '/history': {
    text: 'History',
    icon: <GalleryHorizontalEnd strokeWidth="1" />,
  },
};

const Navigation = () => {
  return (
    <div className="h-[calc(100vh-48px)] sticky left-6 rounded-full bg-primary/10 top-6 mt-6 border border-primary/20">
      <div className="p-2 space-y-7">
        <div>
          <Link to="/" className="block w-14 mx-auto">
            <img src="/logo.png" alt="Weathre app" />
          </Link>
        </div>
        <nav>
          <ul className="space-y-1">
            {Object.entries(Links).map(([link, data]) => (
              <li key={link}>
                <TooltipProvider delayDuration={700}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={link} className="block [&.active]:bg-primary/20 rounded-md">
                        <div className="flex justify-center h-12 items-center rounded-md hover:bg-primary/10 transition-all">
                          {data.icon}
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{data.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <TemperatureToggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
