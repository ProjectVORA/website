interface BlogCardProps {
  image: string;
  category: string;
  title: string;
}

export default function BlogCard({ image, category, title }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <span className="text-sm text-[#2D5BFF] font-medium">{category}</span>
        <h3 className="text-lg font-bold text-gray-900 mt-2 leading-snug">
          {title}
        </h3>
      </div>
    </article>
  );
}
