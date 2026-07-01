import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, ChevronRight, AlertCircle, Share2, CheckCircle } from "lucide-react";
import SEO from "../seo/SEO";
import { blogs } from "../data/blogs";
import { getBreadcrumbSchema } from "../seo/site";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find corresponding post
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="font-serif text-2xl font-black text-[#17332E] mb-2">Article Not Found</h2>
        <p className="text-xs md:text-sm text-[#17332E]/60 mb-6 font-semibold">The blog post you are looking for does not exist.</p>
        <Link to="/blog" className="bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white px-6 py-3 rounded-full text-xs font-bold shadow transition-all">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.title}
        description={post.summary}
        canonicalPath={`/blog/${post.slug}`}
        isBlogPost={true}
        blogData={post}
        schemas={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* Breadcrumbs */}
      <section className="bg-[#EEF8F6] border-b border-[#00C7A0]/15 py-5 px-4 md:px-8 text-xs font-semibold relative z-10 text-left">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[#17332E]/70">
          <Link to="/" className="hover:text-[#0088A9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#00C7A0]/60" />
          <Link to="/blog" className="hover:text-[#0088A9] transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#00C7A0]/60" />
          <span className="text-[#0088A9] truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </div>
      </section>

      {/* Main post layout */}
      <section className="py-16 bg-[#F8FCFB] px-4 md:px-8 relative z-10 text-left">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-xs text-[#0088A9] font-bold hover:text-[#00C7A0] mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Blog Index
          </button>

          {/* Post Header */}
          <header className="flex flex-col gap-4 mb-8">
            <span className="inline-block bg-[#0088A9]/10 text-[#0088A9] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full w-max shadow-sm border border-[#0088A9]/5">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#17332E] leading-tight">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#17332E]/60 border-b border-[#00C7A0]/15 pb-6 mt-2 font-semibold">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#0088A9]" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0088A9]" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0088A9]" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Post Content */}
          <article className="prose max-w-none text-[#17332E]/85 text-sm md:text-base leading-relaxed font-medium flex flex-col gap-8">
            {post.content.map((sec, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#0088A9] mt-4 leading-snug">
                  {sec.sectionTitle}
                </h2>
                <p className="whitespace-pre-line text-[#17332E]/70 font-semibold leading-relaxed">{sec.text}</p>
              </div>
            ))}
          </article>

          {/* Tags Footer */}
          <footer className="border-t border-[#00C7A0]/15 pt-8 mt-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#17332E]/60 font-bold uppercase tracking-wider">Tags:</span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#EEF8F6] px-3.5 py-1.5 rounded-lg text-xs text-[#0088A9] border border-[#00C7A0]/10 font-bold shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="inline-flex items-center gap-2 text-xs text-[#0088A9] hover:text-[#00C7A0] font-bold border border-[#0088A9]/20 hover:bg-[#EEF8F6] px-4.5 py-2.5 rounded-xl transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Link
            </button>
          </footer>

          {/* CTA Banner inside post */}
          <div className="bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white p-8 md:p-10 rounded-[2.5rem] mt-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border-4 border-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-[#00C7A0]/10 blur-[50px] pointer-events-none" />
            <div className="flex flex-col gap-2.5 max-w-md text-left z-10">
              <h4 className="font-serif text-xl sm:text-2xl font-black text-white">
                Struggling with Joint or Spine Pain?
              </h4>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-semibold">
                Consult with our clinical medical team at Chiro Care. We analyze posture, mechanical discrepancies, and Dosha imbalances to set you on a natural pain-free path.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-[#00C7A0] hover:bg-[#00C7A0]/90 text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl shrink-0 transition-all shadow-md border border-white/20 z-10"
            >
              Book Consult Now
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default BlogPost;
