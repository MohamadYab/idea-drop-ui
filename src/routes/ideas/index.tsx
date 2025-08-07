import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [
      {
        title: "IdeaHub - Browse Ideas"
      }
    ]
  }),
  component: IdeasPage,
  loader: async () => {
    return "Mohamad";
  }
})

function IdeasPage() {
  const name = Route.useLoaderData();
  return <div>Hello {name}!</div>
}
