import {useState} from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { createIdea } from '@/api/ideas';

export const Route = createFileRoute('/ideas/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      navigate({ to: '/ideas' })
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await mutateAsync({
        title,
        summary,
        description,
        tags: tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag !== '')
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Create New Idea</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className='block text-gray-700 font-medium mb-1'
          >
            Title
          </label>
          <input
            type="text"
            id='title'
            name='title'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter Idea Title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="summary"
            className='block text-gray-700 font-medium mb-1'
          >
            Summary
          </label>
          <input
            type="text"
            id='summary'
            name='summary'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter Idea Summary'
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className='block text-gray-700 font-medium mb-1'
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Write out the description of your idea'
            rows={6}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className='block text-gray-700 font-medium mb-1'
          >
            Tags
          </label>
          <input
            type="text"
            id='tags'
            name='tags'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter Idea Tags'
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </div>

        <div className="mt-5">
          <button
            type='submit'
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            Create Idea
          </button>
        </div>
      </form>
    </div>
  );
}
