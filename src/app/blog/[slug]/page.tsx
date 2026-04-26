import { notFound } from "next/navigation";
import { PageHero, PublicPage } from "@/components/public-page";
import { blogPosts } from "@/lib/site";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return (
    <PublicPage>
      <main className="pb-28">
        <PageHero title={post.title} body={post.description} />
        <article className="glass mx-auto max-w-3xl rounded-2xl p-6 leading-8 text-[#C9D6F5]">
          <p>This is a blog article placeholder. Replace this with real mechanic advice, maintenance guides, and Perth customer stories when content is ready.</p>
        </article>
      </main>
    </PublicPage>
  );
}
