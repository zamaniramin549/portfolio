import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        createdAt
        followers { totalCount }
        following { totalCount }
        repositories(first: 6, orderBy: {field: STARGAZERS, direction: DESC}, ownerAffiliations: OWNER) {
          nodes {
            name
            description
            stargazerCount
            forkCount
            url
            primaryLanguage { name color }
          }
        }
        contributionsCollection {
          totalCommitContributions
          totalRepositoryContributions
          totalPullRequestContributions
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    const user = json.data?.user;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      joined: new Date(user.createdAt).getFullYear(),
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
      repositories: user.repositories.nodes,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}

