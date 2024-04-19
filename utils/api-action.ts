export const hasOperationOpen = async ({ url }: { url: string }) => {
  const response = await fetch(`${url}open`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
};
