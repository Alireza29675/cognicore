// Gets the pages from the given directory
const pages = import.meta.glob('../pages/**/index.tsx')

interface IPageModule {
  default: React.FC
  metadata: {
    title: string
    route: string
  }
}

// Returns an array of page modules
export const getPages = async (): Promise<IPageModule[]> => {
  const uris = Object.keys(pages);
  // Returns the page modules from the given paths
  return Promise.all(uris.map(async (path) => await pages[path]() as IPageModule));
}