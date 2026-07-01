import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import SEO from "../seo/SEO";
import { blogs } from "../data/blogs";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Collect all unique tags
  const allTags = ["All", ...new Set(blogs.flatMap((b) => b.tags))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <SEO 
        title="Health & Wellness Blog" 
        description="Read research-backed natural healing blogs covering sciatica exercises, migraine relief, joint health, and Ayurvedic lifestyle tips."
        canonicalPath="/blog"
      />

      {/* Header Banner */}
      <section className="relative py-24 bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }} />
        <div className="absolute bottom-[-20%] right-[10%] w-96 h-96 bg-[#00C7A0]/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.25em] text-[#00C7A0] font-extrabold">
            Health Insights & Advice
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-wide leading-tight">
            Our Health & Wellness Blog
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-semibold mt-1">
            Stay updated with educational wellness logs, spine health guidelines, and clinical nutrition reviews compiled by our doctor team.
          </p>
        </div>
      </section>

      {/* Filter and Search controls */}
      <section className="py-12 bg-[#EEF8F6] px-4 md:px-8 relative z-10 border-b border-[#00C7A0]/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Tags Tab list */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white shadow-md shadow-[#00C7A0]/25"
                    : "bg-white text-[#0088A9] border border-[#00C7A0]/20 hover:bg-[#EEF8F6]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0088A9]/60" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-11 pr-4 py-3 rounded-full text-xs font-semibold placeholder-[#0088A9]/50 outline-none shadow-sm focus:ring-2 focus:ring-[#00C7A0] border border-[#00C7A0]/10"
            />
          </div>

        </div>
      </section>

      {/* Blogs list */}
      <section className="py-24 bg-[#F8FCFB] px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <motion.article
                  key={blog.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border border-[#00C7A0]/10 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#00C7A0]/20 transition-all duration-300 flex flex-col text-left group"
                >
                  <div className="h-52 bg-[#0088A9]/10 flex items-center justify-center text-[#0088A9] relative overflow-hidden">
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded shadow z-10">
                      {blog.category}
                    </div>
                    
                    {/* Blog Cover Image Placeholder */}
                    <img
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
                      alt={blog.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none opacity-80"
                    />
                    <div className="absolute inset-0 bg-[#005D73]/10" />
                  </div>
                  
                  <div className="p-7 flex flex-col gap-3.5 flex-grow">
                    <div className="flex items-center gap-3 text-[10px] text-[#0088A9] font-bold">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-black text-[#17332E] leading-snug group-hover:text-[#0088A9] transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-xs md:text-sm text-[#17332E]/70 leading-relaxed font-medium flex-grow">
                      {blog.summary}
                    </p>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="group/link inline-flex items-center gap-1.5 text-xs text-[#0088A9] font-bold hover:text-[#00C7A0] mt-auto pt-4 border-t border-[#EEF8F6]"
                    >
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#00C7A0]/10 shadow-sm max-w-lg mx-auto">
              <BookOpen className="w-16 h-16 text-[#00C7A0]/30 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-black text-[#17332E] mb-2">No Articles Found</h3>
              <p className="text-xs md:text-sm text-[#17332E]/60 font-semibold">
                Try searching for other terms or selecting a different tag filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
