
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100"></div>
        <h1 className={'text-2xl font-bold'}>Platform is loading</h1>
      </div>
    </div>
  )
}