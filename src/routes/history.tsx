import { createFileRoute } from '@tanstack/react-router';
import HistoryList from '@/Layouts/HistoryList';

export const Route = createFileRoute('/history')({
  component: () => <HistoryList />,
});
