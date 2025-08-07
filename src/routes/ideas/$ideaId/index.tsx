import { createFileRoute, Link } from '@tanstack/react-router';
import {
  queryOptions,
  useSuspenseQuery
} from '@tanstack/react-query';
import type { Idea } from '@/types';

const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const response = await fetch(`/api/ideas/${ideaId}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
}

/**
 * Define query configs as a stand-alone, type-safe and reusable helper function
 * queryOptions allows us to use different query hooks (e.g. useQuery, useSuspenseQuery, etc)
 * @param ideaId 
 * @returns
 */
const ideaQueryOptions = (ideaId: string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
});

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  // Destructure queryClient from context
  loader: async ({ params, context: { queryClient } }) => {
    // Use the query client context to ensure a return data
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  }
})

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  /**
   * useSuspense "suspends" the response until data is loaded (No need to manage loading state)
   * Rename data as idea
   */
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));
  return (
    <div className="p-4">
      <Link
        to="/ideas"
        className='text-blue-500 underline block mb-4'
      >
        Back To Ideas
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>
    </div>
  );
}
