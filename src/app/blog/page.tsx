import Link from "next/link";
import { PageHero, PublicPage } from "@/components/public-page";
import { blogPosts } from "@/lib/site";

export const metadata = { title: "Blog", description: "Nomad Auto Services article placeholders." };

export default function BlogPage() {
  return (
    <PublicPage>
      <main className="pb-28">
        <PageHero title="Nomad blog." body="Helpful articles for drivers will live here. These placeholders preserve the route structure for content publishing." />
        <section className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2 md:px-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="glass rounded-2xl p-6 hover:border-[#FFC526]/60">
              <h2 className="text-2xl font-black">{post.title}</h2>
              <p className="mt-3 leading-7 text-[#C9D6F5]">{post.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </PublicPage>
  );
}
