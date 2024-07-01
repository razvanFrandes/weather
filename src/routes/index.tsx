import { WeatherSearch } from '@/Layouts/WeatherSearch';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <WeatherSearch />,
});
