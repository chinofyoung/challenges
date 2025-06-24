interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-lg text-gray-300">{description}</p>
    </div>
  );
}
