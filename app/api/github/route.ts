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
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
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
      next: { revalidate: 3600 }, // Cache data for 1 hour
    });

    const json = await res.json();
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Format data for react-activity-calendar
    const contributions = calendar.weeks.flatMap((week: { contributionDays: Array<{ date: string; contributionCount: number }> }) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level:
          day.contributionCount === 0
            ? 0
            : day.contributionCount < 3
            ? 1
            : day.contributionCount < 6
            ? 2
            : day.contributionCount < 10
            ? 3
            : 4,
      }))
    );

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      contributions,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}

