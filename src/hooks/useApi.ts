export const useApi = () => {
  const get = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  };

  const post = async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create');
    return res.json();
  };

  const put = async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update');
    return res.json();
  };

  const del = async (url: string) => {
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    return res.json();
  };

  return { get, post, put, del };
};