import { User } from '../store/dataSlice';

export default async function getContributors(owner: string, repo: string) {
  let contributors: User[] = [];
  let i = 1;

  while (true) {
    const res = await getContributorsByPage(owner, repo, i);
    if (!res || res.length === 0) break;
    contributors.push(...res);
    i++;
  }

  return contributors;
}

async function getContributorsByPage(
  owner: string,
  repo: string,
  page: number,
) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=${page}`,
  );
  if (!res.ok) throw new Error();
  return await res.json();
}
